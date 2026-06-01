import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { API_URL } from "./axios";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { toast } from "sonner";

interface QueueItem {
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (
  error: any,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export function setupRefreshInterceptor(
  apiClient: AxiosInstance
) {
  apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest =
        error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        if (originalRequest.url?.includes("/auth/login")) {
          return Promise.reject(error);
        }

        if (originalRequest.url?.includes("/auth/refresh-token")) {
          handleLogoutRedirect("Sesión expirada");
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization =
                  `Bearer ${token}`;
              }

              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken =
          useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          handleLogoutRedirect("Sesión expirada");
          isRefreshing = false;
          return Promise.reject(error);
        }

        try {
          const response = await axios.post(
            `${API_URL}/auth/refresh-token`,
            {
              refresh_token: refreshToken,
            }
          );

          const {
            access_token,
            refresh_token,
          } = response.data;

          useAuthStore
            .getState()
            .setTokens(access_token, refresh_token);

          processQueue(null, access_token);

          isRefreshing = false;

          if (originalRequest.headers) {
            originalRequest.headers.Authorization =
              `Bearer ${access_token}`;
          }

          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          isRefreshing = false;

          handleLogoutRedirect("Sesión expirada");

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}

function handleLogoutRedirect(message: string) {
  useAuthStore.getState().clearAuth();
  useUserStore.getState().clearUser();

  toast.error(message);

  window.location.href = "/";
}
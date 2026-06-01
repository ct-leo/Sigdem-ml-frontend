import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { useAuthStore } from "../stores/authStore";

export function setupAuthInterceptor(
  apiClient: AxiosInstance
) {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken =
        useAuthStore.getState().accessToken;

      if (accessToken && config.headers) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
}
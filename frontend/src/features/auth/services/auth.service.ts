import { apiClient } from "../../../api/axios";
import type { LoginRequest, LoginResponse, ProfileResponse, RefreshTokenRequest } from "../types/auth.types";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const response = await apiClient.get<ProfileResponse>("/auth/profile");
    return response.data;
  },

  refreshToken: async (params: RefreshTokenRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/refresh-token", params);
    return response.data;
  },

  logout: async (params: RefreshTokenRequest): Promise<void> => {
    await apiClient.post("/auth/logout", params);
  },
};

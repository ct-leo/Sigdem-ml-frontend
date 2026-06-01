import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../../../stores/authStore";

export const useRefreshToken = () => {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = authStore.refreshToken;
      if (!refreshToken) throw new Error("No refresh token found");
      const data = await authService.refreshToken({ refresh_token: refreshToken });
      authStore.setTokens(data.access_token, data.refresh_token);
      return data;
    },
  });
};

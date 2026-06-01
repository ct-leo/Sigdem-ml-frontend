import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../../../stores/authStore";
import { useUserStore } from "../../../stores/userStore";
import type { LoginRequest } from "../types/auth.types";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const loginStore = useAuthStore();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      // 1. Run real authentication call
      const loginData = await authService.login(credentials);
      
      // 2. Set tokens in store
      loginStore.login(loginData.access_token, loginData.refresh_token);
      
      // 3. Get profile details from server
      const profileData = await authService.getProfile();
      
      // 4. Set user profile
      userStore.setUser(profileData);
      
      return { loginData, profileData };
    },
    onSuccess: () => {
      toast.success("Bienvenido al sistema");
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        toast.error("Credenciales inválidas");
      } else {
        toast.error(
          error.response?.data?.message || 
          error.response?.data?.detail || 
          "Error de conexión con el servidor"
        );
      }
    },
  });
};

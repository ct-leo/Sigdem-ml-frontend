import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../../../stores/authStore";
import { useUserStore } from "../../../stores/userStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authStore = useAuthStore();
  const userStore = useUserStore();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = authStore.refreshToken;
      if (refreshToken) {
        try {
          await authService.logout({ refresh_token: refreshToken });
        } catch (error) {
          console.warn("Logout request failed on server, cleaning state locally", error);
        }
      }
    },
    onSuccess: () => {
      // Clean up stores
      authStore.clearAuth();
      userStore.clearUser();
      
      // Clean queryClient
      queryClient.clear();
      
      toast.success("Sesión cerrada correctamente");
      navigate("/");
    },
    onError: () => {
      // Even if API fails, clean up locally
      authStore.clearAuth();
      userStore.clearUser();
      queryClient.clear();
      toast.success("Sesión cerrada correctamente");
      navigate("/");
    },
  });
};

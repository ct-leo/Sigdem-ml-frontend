import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { useUserStore } from "../../../stores/userStore";
import { useAuthStore } from "../../../stores/authStore";

export const useProfile = () => {
  const userStore = useUserStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["auth-profile"],
    queryFn: async () => {
      const profile = await authService.getProfile();
      userStore.setUser(profile);
      return profile;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 15, // 15 mins cache
  });
};

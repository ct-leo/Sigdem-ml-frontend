import { useAuthStore } from "../auth/authStore";

export const useAuth = () => {
  const store = useAuthStore();
  return store;
};

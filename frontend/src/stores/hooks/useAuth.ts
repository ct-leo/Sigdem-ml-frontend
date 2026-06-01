import { useAuthStore } from "../authStore";

export const useAuth = () => {
  const store = useAuthStore();
  return store;
};

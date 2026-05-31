import { useUserStore } from "../users/userStore";

export const useUser = () => {
  const store = useUserStore();
  return store;
};

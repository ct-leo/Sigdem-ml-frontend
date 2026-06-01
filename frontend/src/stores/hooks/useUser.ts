import { useUserStore } from "../userStore";

export const useUser = () => {
  const store = useUserStore();
  return store;
};

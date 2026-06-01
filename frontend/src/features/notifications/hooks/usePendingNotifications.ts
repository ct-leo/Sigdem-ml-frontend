import { useNotifications } from "./useNotifications";

/**
 * Custom hook that queries and filters notifications where state is PENDIENTE.
 */
export const usePendingNotifications = () => {
  return useNotifications({ estado: "PENDIENTE" });
};
export default usePendingNotifications;

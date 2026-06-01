import { useNotifications } from "./useNotifications";

/**
 * Specialized wrapper hook to retrieve notification logs for a specific Tramite ID.
 */
export const useNotificationsByTramite = (tramiteId: number) => {
  return useNotifications({ tramite_id: tramiteId });
};
export default useNotificationsByTramite;

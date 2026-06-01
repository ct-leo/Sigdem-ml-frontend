import { useQuery } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";
import { NOTIFICATIONS_KEYS } from "../queryKeys/notifications.keys";

export const useNotification = (id: number) => {
  return useQuery({
    queryKey: NOTIFICATIONS_KEYS.detail(id),
    queryFn: () => notificationsService.getNotification(id),
    enabled: !!id && id > 0,
  });
};
export default useNotification;

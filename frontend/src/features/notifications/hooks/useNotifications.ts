import { useQuery } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";
import type { NotificationFilters } from "../services/notifications.service";
import { NOTIFICATIONS_KEYS } from "../queryKeys/notifications.keys";

export const useNotifications = (filters?: NotificationFilters) => {
  return useQuery({
    queryKey: [...NOTIFICATIONS_KEYS.list, filters],
    queryFn: () => notificationsService.getNotifications(filters),
    refetchInterval: 30000, // auto-refresh every 30 seconds to keep operational dashboard current
  });
};
export default useNotifications;

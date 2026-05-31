import { useNotificationStore } from "../notifications/notificationStore";

export const useNotifications = () => {
  const store = useNotificationStore();
  return store;
};

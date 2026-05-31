export type NotificationType = "success" | "info" | "warning" | "error" | "system";

export type NotificationCategory = "Trámites" | "Documentos" | "RRHH" | "IA" | "Sistema";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  read: boolean;
  createdAt: string; // ISO string
  link?: string;
}

export interface NotificationState {
  notifications: Notification[];
}

export interface NotificationActions {
  addNotification: (
    title: string,
    message: string,
    type: NotificationType,
    category: NotificationCategory,
    link?: string
  ) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

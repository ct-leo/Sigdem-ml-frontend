import type { NotificationStatus } from "../types/notification.types";
import { NOTIFICATION_STATUS_LABELS, NOTIFICATION_STATUS_COLORS } from "../constants/notificationStatus";

export const notificationMapper = {
  /**
   * Get display friendly label for notification status.
   */
  getStatusLabel: (status: NotificationStatus): string => {
    return NOTIFICATION_STATUS_LABELS[status] || status;
  },

  /**
   * Get theme color classes for status badges.
   */
  getStatusColorClass: (status: NotificationStatus): string => {
    return NOTIFICATION_STATUS_COLORS[status] || "bg-slate-50 text-slate-700 border-slate-200";
  },

  /**
   * Format dates for modern visual timelines.
   */
  formatTimelineDate: (dateString: string | null): string => {
    if (!dateString) return "Pendiente de envío";
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
};
export default notificationMapper;

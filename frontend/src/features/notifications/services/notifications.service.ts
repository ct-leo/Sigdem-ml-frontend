import apiClient from "../../../api/axios";
import type {
  Notification,
  SendNotificationDto,
  NotificationResponse,
  NotificationStatus,
} from "../types/notification.types";

export interface NotificationFilters {
  tramite_id?: number;
  estado?: NotificationStatus;
}

export const notificationsService = {
  /**
   * GET /notifications/
   * List all system email notifications, supports filtering by tramite_id and status.
   */
  getNotifications: async (filters?: NotificationFilters): Promise<Notification[]> => {
    const params: Record<string, unknown> = {};
    if (filters?.tramite_id) params.tramite_id = filters.tramite_id;
    if (filters?.estado) params.estado = filters.estado;

    const response = await apiClient.get<Notification[]>("/notifications/", { params });
    return response.data;
  },

  /**
   * GET /notifications/{id}
   * Get detail of a specific notification.
   */
  getNotification: async (id: number): Promise<Notification> => {
    const response = await apiClient.get<Notification>(`/notifications/${id}`);
    return response.data;
  },

  /**
   * POST /notifications/email
   * Send a new email notification.
   */
  sendNotification: async (data: SendNotificationDto): Promise<NotificationResponse> => {
    const response = await apiClient.post<NotificationResponse>("/notifications/email", data);
    return response.data;
  },

  /**
   * POST /notifications/{id}/resend
   * Resend a failed or pending notification.
   */
  resendNotification: async (id: number): Promise<NotificationResponse> => {
    const response = await apiClient.post<NotificationResponse>(`/notifications/${id}/resend`);
    return response.data;
  },
};
export default notificationsService;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";
import { NOTIFICATIONS_KEYS } from "../queryKeys/notifications.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { SendNotificationDto } from "../types/notification.types";

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useMutation({
    mutationFn: (data: SendNotificationDto) => notificationsService.sendNotification(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEYS.all });
      toast.success("Notificación enviada correctamente");
      addNotification(
        "Notificación Enviada",
        `Se envió correctamente el correo para "${data.destinatario}" con asunto: "${data.asunto}".`,
        "success",
        "Sistema",
        "/notificaciones"
      );
    },
    onError: (error: any) => {
      const detail =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Error al enviar la notificación";
      toast.error(detail);
    },
  });
};
export default useSendNotification;

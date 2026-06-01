import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";
import { NOTIFICATIONS_KEYS } from "../queryKeys/notifications.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useResendNotification = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useMutation({
    mutationFn: (id: number) => notificationsService.resendNotification(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEYS.detail(data.id) });
      toast.success("Notificación reenviada correctamente");
      addNotification(
        "Notificación Reenviada",
        `Se reenvió con éxito el correo para "${data.destinatario}" con asunto: "${data.asunto}".`,
        "info",
        "Sistema",
        "/notificaciones"
      );
    },
    onError: (error: any) => {
      const detail =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Error al reenviar la notificación";
      toast.error(detail);
    },
  });
};
export default useResendNotification;

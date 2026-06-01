import { useMutation } from "@tanstack/react-query";
import { mlTramitesService } from "../services/mlTramites.service";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const usePredictTramite = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (id: number) => mlTramitesService.predictTramite(id),
    onSuccess: (data) => {
      toast.success(`Predicción generada para ${data.codigo}: ${data.prioridad}`);
      addNotification(
        "Predicción de Expediente",
        `Se ha ejecutado la inferencia de prioridad para el expediente ${data.codigo}. Prioridad: ${data.prioridad}.`,
        "info",
        "Trámites",
        `/tramites/${data.tramite_id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al predecir prioridad de expediente";
      toast.error(detail);
    },
  });
};

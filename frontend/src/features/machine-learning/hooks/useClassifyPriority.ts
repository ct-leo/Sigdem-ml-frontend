import { useMutation } from "@tanstack/react-query";
import { mlTramitesService } from "../services/mlTramites.service";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { ClassifyPriorityRequest } from "../types/mlTramites.types";

export const useClassifyPriority = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (data: ClassifyPriorityRequest) => mlTramitesService.classifyPriority(data),
    onSuccess: (data) => {
      toast.success(`Clasificación ejecutada: Prioridad predicha: ${data.prioridad}`);
      addNotification(
        "Clasificación Manual",
        `Se ha clasificado un trámite de prueba. Prioridad predicha: ${data.prioridad} con ${(data.confidence * 100).toFixed(2)}% de confianza.`,
        "info",
        "Sistema",
        "/machine-learning"
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al realizar la clasificación";
      toast.error(detail);
    },
  });
};

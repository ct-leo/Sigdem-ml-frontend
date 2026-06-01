import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nlpService } from "../services/nlp.service";
import { NLP_KEYS } from "../queryKeys/nlp.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { CVMatchRequest } from "../types/nlp.types";

export const useCVMatch = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useMutation({
    mutationFn: (data: CVMatchRequest) => nlpService.matchCV(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: NLP_KEYS.all });
      queryClient.invalidateQueries({ queryKey: NLP_KEYS.ranking(data.job_id) });

      toast.success("Comparación NLP ejecutada correctamente");
      addNotification(
        "Análisis NLP Ejecutado",
        `Se ejecutó la comparación NLP para ${data.candidato} en la convocatoria ${data.convocatoria} con compatibilidad del ${data.compatibilidad}%.`,
        "success",
        "IA",
        `/rankings/${data.job_id}`
      );
    },
    onError: (error: any) => {
      const detail =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Error al ejecutar comparación NLP";
      toast.error(detail);
    },
  });
};

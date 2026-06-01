import { useQuery } from "@tanstack/react-query";
import { nlpService } from "../services/nlp.service";
import { NLP_KEYS } from "../queryKeys/nlp.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";

export const useCandidateRanking = (jobId: number) => {
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useQuery({
    queryKey: NLP_KEYS.ranking(jobId),
    queryFn: async () => {
      const data = await nlpService.getRanking(jobId);
      // Trigger notification when ranking is fetched successfully from the server
      addNotification(
        "Ranking Generado",
        `El ranking de candidatos para la convocatoria "${data.convocatoria}" ha sido actualizado con ${data.total_candidatos} perfiles analizados.`,
        "info",
        "IA",
        `/rankings/${jobId}`
      );
      return data;
    },
    enabled: !!jobId && !isNaN(jobId),
    staleTime: 30000, // 30 seconds stale time to avoid excessive notifications on duplicate requests
  });
};

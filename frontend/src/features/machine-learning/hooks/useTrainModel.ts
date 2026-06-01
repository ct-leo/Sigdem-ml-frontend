import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mlTramitesService } from "../services/mlTramites.service";
import { ML_KEYS } from "../queryKeys/ml.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useTrainModel = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: () => mlTramitesService.trainModel(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ML_KEYS.metrics });
      toast.success("Modelo Random Forest entrenado correctamente");
      addNotification(
        "Modelo ML Entrenado",
        `El clasificador de prioridades ha sido re-entrenado. Precisión actual: ${(data.accuracy * 100).toFixed(2)}%. Muestras: ${data.total_samples}.`,
        "success",
        "Sistema",
        "/machine-learning"
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al entrenar el modelo";
      toast.error(detail);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cvsService } from "../services/cvs.service";
import { CVS_KEYS } from "../queryKeys/cvs.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useExtractCV = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useMutation({
    mutationFn: (id: number) => cvsService.extractCV(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CVS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: CVS_KEYS.detail(data.cv_id) });
      toast.success("Texto del CV extraído correctamente");
      addNotification(
        "Texto Extraído",
        `El contenido del currículo CV-${data.cv_id} fue procesado por el motor NLP.`,
        "info",
        "RRHH",
        `/curriculos/${data.cv_id}`
      );
    },
    onError: (error: any) => {
      const detail =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Error al extraer texto del currículo";
      toast.error(detail);
    },
  });
};

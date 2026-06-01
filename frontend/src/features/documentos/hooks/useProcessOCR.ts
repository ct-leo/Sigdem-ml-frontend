import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";
import { DOCUMENTS_KEYS } from "../queryKeys/documents.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useProcessOCR = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (id: number) => documentsService.processOCR(id),
    onSuccess: (_, id) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.detail(id) });
      
      toast.success("Texto extraído correctamente");
      addNotification(
        "OCR Procesado",
        `Se ha extraído texto e indexado el documento #${id} exitosamente.`,
        "success",
        "Trámites",
        `/documentos/${id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al procesar OCR";
      toast.error(detail);
    },
  });
};

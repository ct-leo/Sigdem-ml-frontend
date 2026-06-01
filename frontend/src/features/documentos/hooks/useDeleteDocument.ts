import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";
import { DOCUMENTS_KEYS } from "../queryKeys/documents.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (id: number) => documentsService.deleteDocument(id),
    onSuccess: (_, id) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.detail(id) });
      
      toast.success("Documento eliminado");
      addNotification(
        "Documento Eliminado",
        `El documento #${id} fue eliminado correctamente del sistema.`,
        "warning",
        "Trámites",
        "/documentos"
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al eliminar el documento";
      toast.error(detail);
    },
  });
};

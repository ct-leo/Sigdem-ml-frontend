import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";
import { DOCUMENTS_KEYS } from "../queryKeys/documents.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { UploadDocumentDto } from "../types/document.types";

interface UploadMutationParams {
  data: UploadDocumentDto;
  onUploadProgress?: (progressEvent: any) => void;
}

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ data, onUploadProgress }: UploadMutationParams) => 
      documentsService.uploadDocument(data, onUploadProgress),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: DOCUMENTS_KEYS.all });
      toast.success("Documento cargado correctamente");
      addNotification(
        "Documento Cargado",
        `El archivo ${data.nombre_original} fue subido satisfactoriamente al trámite #${data.tramite_id}.`,
        "success",
        "Trámites",
        `/documentos/${data.id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al subir el documento";
      toast.error(detail);
    },
  });
};

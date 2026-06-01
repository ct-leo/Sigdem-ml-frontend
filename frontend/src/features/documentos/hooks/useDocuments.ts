import { useQuery } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";
import { DOCUMENTS_KEYS } from "../queryKeys/documents.keys";

export const useDocuments = (filters?: { tramite_id?: number; ocr_procesado?: string }) => {
  return useQuery({
    queryKey: [...DOCUMENTS_KEYS.list, filters],
    queryFn: () => documentsService.getDocuments(filters),
  });
};

export const useDocumentsByTramite = (tramiteId: number) => {
  return useQuery({
    queryKey: DOCUMENTS_KEYS.tramite(tramiteId),
    queryFn: () => documentsService.getDocuments({ tramite_id: tramiteId }),
    enabled: !!tramiteId && !isNaN(tramiteId),
  });
};

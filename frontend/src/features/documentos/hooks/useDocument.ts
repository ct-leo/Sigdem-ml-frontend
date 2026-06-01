import { useQuery } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";
import { DOCUMENTS_KEYS } from "../queryKeys/documents.keys";

export const useDocument = (id: number) => {
  return useQuery({
    queryKey: DOCUMENTS_KEYS.detail(id),
    queryFn: () => documentsService.getDocument(id),
    enabled: !!id && !isNaN(id),
  });
};

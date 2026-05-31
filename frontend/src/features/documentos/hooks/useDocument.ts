import { useQuery } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => documentsService.getDocumentById(id),
    enabled: !!id,
  });
};

export const useDocumentStats = () => {
  return useQuery({
    queryKey: ["documentStats"],
    queryFn: () => documentsService.getDocumentStats(),
  });
};

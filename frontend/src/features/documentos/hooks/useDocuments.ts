import { useQuery } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";

export const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: () => documentsService.getDocuments(),
  });
};

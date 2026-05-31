import { useQuery } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";

export const useTramite = (id: string) => {
  return useQuery({
    queryKey: ["tramite", id],
    queryFn: () => tramitesService.getTramiteById(id),
    enabled: !!id,
  });
};

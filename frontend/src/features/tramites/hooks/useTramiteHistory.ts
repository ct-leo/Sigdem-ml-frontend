import { useQuery } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";
import { TRAMITES_KEYS } from "../queryKeys/tramites.keys";

export const useTramiteHistory = (id: number) => {
  return useQuery({
    queryKey: TRAMITES_KEYS.history(id),
    queryFn: () => tramitesService.getHistory(id),
    enabled: !!id && !isNaN(id),
  });
};

import { useQuery } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";
import { TRAMITES_KEYS } from "../queryKeys/tramites.keys";

export const useTramite = (id: number) => {
  return useQuery({
    queryKey: TRAMITES_KEYS.detail(id),
    queryFn: () => tramitesService.getTramite(id),
    enabled: !!id && !isNaN(id),
  });
};

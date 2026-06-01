import { useQuery } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";
import { TRAMITES_KEYS } from "../queryKeys/tramites.keys";

export const useTramites = (filters?: { estado?: string; prioridad?: string; area?: string }) => {
  return useQuery({
    queryKey: [...TRAMITES_KEYS.list, filters],
    queryFn: () => tramitesService.getTramites(filters),
  });
};

import { useQuery } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";

export const useTramites = () => {
  return useQuery({
    queryKey: ["tramites"],
    queryFn: () => tramitesService.getTramites(),
  });
};

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { DASHBOARD_KEYS } from "../queryKeys/dashboard.keys";

export const useTramitesByPriority = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.priorities,
    queryFn: () => dashboardService.getTramitesByPriority(),
    staleTime: Infinity, // Keep in cache, only load once
  });
};

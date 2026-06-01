import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { DASHBOARD_KEYS } from "../queryKeys/dashboard.keys";

export const useTramitesByStatus = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.status,
    queryFn: () => dashboardService.getTramitesByStatus(),
    staleTime: Infinity, // Keep in cache, only load once
  });
};

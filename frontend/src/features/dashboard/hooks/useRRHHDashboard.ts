import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { DASHBOARD_KEYS } from "../queryKeys/dashboard.keys";

export const useRRHHDashboard = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.rrhh,
    queryFn: () => dashboardService.getRRHHMetrics(),
    staleTime: Infinity, // Keep in cache, only load once
  });
};

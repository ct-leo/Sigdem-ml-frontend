import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { DASHBOARD_KEYS } from "../queryKeys/dashboard.keys";

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.summary,
    queryFn: () => dashboardService.getSummary(),
    staleTime: Infinity, // Keep in cache, only load once
  });
};

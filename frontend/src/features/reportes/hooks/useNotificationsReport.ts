import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import { REPORTS_KEYS } from "../queryKeys/reports.keys";

export const useNotificationsReport = () => {
  return useQuery({
    queryKey: REPORTS_KEYS.notifications,
    queryFn: () => reportsService.getNotificationsReport(),
    staleTime: 60000,
    refetchInterval: 120000,
  });
};
export default useNotificationsReport;

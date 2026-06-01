import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import { REPORTS_KEYS } from "../queryKeys/reports.keys";

export const useTramitesReport = () => {
  return useQuery({
    queryKey: REPORTS_KEYS.tramites,
    queryFn: () => reportsService.getTramitesReport(),
    staleTime: 60000,
    refetchInterval: 120000, // automatic refetch every 120 seconds
  });
};
export default useTramitesReport;

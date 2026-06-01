import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import { REPORTS_KEYS } from "../queryKeys/reports.keys";

export const useRRHHReport = () => {
  return useQuery({
    queryKey: REPORTS_KEYS.rrhh,
    queryFn: () => reportsService.getRRHHReport(),
    staleTime: 60000,
    refetchInterval: 120000,
  });
};
export default useRRHHReport;

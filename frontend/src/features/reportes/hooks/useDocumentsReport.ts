import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import { REPORTS_KEYS } from "../queryKeys/reports.keys";

export const useDocumentsReport = () => {
  return useQuery({
    queryKey: REPORTS_KEYS.documents,
    queryFn: () => reportsService.getDocumentsReport(),
    staleTime: 60000,
    refetchInterval: 120000,
  });
};
export default useDocumentsReport;

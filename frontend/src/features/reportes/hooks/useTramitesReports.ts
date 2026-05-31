import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";

export const useTramitesReports = () => {
  return useQuery({
    queryKey: ["tramitesReport"],
    queryFn: () => reportsService.getTramitesReport(),
  });
};

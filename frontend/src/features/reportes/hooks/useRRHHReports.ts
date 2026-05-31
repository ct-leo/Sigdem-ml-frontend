import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";

export const useRRHHReports = () => {
  return useQuery({
    queryKey: ["rrhhReport"],
    queryFn: () => reportsService.getRRHHReport(),
  });
};

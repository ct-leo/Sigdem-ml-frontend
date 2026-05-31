import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";

export const useAIReports = () => {
  return useQuery({
    queryKey: ["aiReport"],
    queryFn: () => reportsService.getAIReport(),
  });
};

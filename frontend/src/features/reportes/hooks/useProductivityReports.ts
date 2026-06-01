import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";

export const useProductivityReports = () => {
  return useQuery({
    queryKey: ["productivityReport"],
    queryFn: () => reportsService.getProductivityReport(),
  });
};

import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";

export const useGlobalStatistics = () => {
  return useQuery({
    queryKey: ["globalStatistics"],
    queryFn: () => reportsService.getGlobalStatistics(),
  });
};

export const useInsights = () => {
  return useQuery({
    queryKey: ["reportInsights"],
    queryFn: () => reportsService.getInsights(),
  });
};

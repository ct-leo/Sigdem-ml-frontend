import { useQuery } from "@tanstack/react-query";
import { mlService } from "../services/ml.service";

export const useMLMetrics = () => {
  return useQuery({
    queryKey: ["mlMetrics"],
    queryFn: () => mlService.getMLData(),
  });
};

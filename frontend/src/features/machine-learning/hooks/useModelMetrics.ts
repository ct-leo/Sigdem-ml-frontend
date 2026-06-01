import { useQuery } from "@tanstack/react-query";
import { mlTramitesService } from "../services/mlTramites.service";
import { ML_KEYS } from "../queryKeys/ml.keys";

export const useModelMetrics = () => {
  return useQuery({
    queryKey: ML_KEYS.metrics,
    queryFn: () => mlTramitesService.getMetrics(),
  });
};

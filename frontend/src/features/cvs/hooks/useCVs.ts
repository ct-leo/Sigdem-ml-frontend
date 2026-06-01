import { useQuery } from "@tanstack/react-query";
import { cvsService } from "../services/cvs.service";
import { CVS_KEYS } from "../queryKeys/cvs.keys";
import type { CVFilters } from "../types/cv.types";

export const useCVs = (filters?: CVFilters) => {
  return useQuery({
    queryKey: [...CVS_KEYS.list, filters],
    queryFn: () => cvsService.getCVs(filters),
  });
};

/** Derived hook — only CVs with texto_procesado === "SI" */
export const useProcessedCVs = () => {
  const query = useCVs();
  return {
    ...query,
    data: query.data?.filter((cv) => cv.texto_procesado === "SI") ?? [],
  };
};

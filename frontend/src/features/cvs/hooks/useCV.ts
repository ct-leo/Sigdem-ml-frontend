import { useQuery } from "@tanstack/react-query";
import { cvsService } from "../services/cvs.service";
import { CVS_KEYS } from "../queryKeys/cvs.keys";

export const useCV = (id: number) => {
  return useQuery({
    queryKey: CVS_KEYS.detail(id),
    queryFn: () => cvsService.getCV(id),
    enabled: !!id && id > 0,
  });
};

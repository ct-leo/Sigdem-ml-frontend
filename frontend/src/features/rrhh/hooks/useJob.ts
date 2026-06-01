import { useQuery } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";
import { JOBS_KEYS } from "../queryKeys/jobs.keys";

export const useJob = (id: number) => {
  return useQuery({
    queryKey: JOBS_KEYS.detail(id),
    queryFn: () => jobsService.getJob(id),
    enabled: !!id && !isNaN(id),
  });
};

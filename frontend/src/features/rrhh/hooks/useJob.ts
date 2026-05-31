import { useQuery } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsService.getJobById(id),
    enabled: !!id,
  });
};

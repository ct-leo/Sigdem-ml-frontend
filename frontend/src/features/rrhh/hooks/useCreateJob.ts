import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";
import type { CreateJobDto } from "../types/job.types";

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateJobDto) => jobsService.createJob(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobStats"] });
    },
  });
};

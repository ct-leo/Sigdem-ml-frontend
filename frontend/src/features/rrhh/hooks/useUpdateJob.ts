import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";
import type { UpdateJobDto } from "../types/job.types";

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateJobDto) => jobsService.updateJob(dto),
    onSuccess: (updatedJob) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", updatedJob.id] });
      queryClient.invalidateQueries({ queryKey: ["jobStats"] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobsService.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobStats"] });
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";
import { JOBS_KEYS } from "../queryKeys/jobs.keys";
import type { JobStatus } from "../types/job.types";

export const useJobs = (filters?: { estado?: JobStatus; area?: string }) => {
  return useQuery({
    queryKey: [...JOBS_KEYS.list, filters],
    queryFn: () => jobsService.getJobs(filters),
  });
};

export const useOpenJobs = () => {
  return useQuery({
    queryKey: [...JOBS_KEYS.list, { estado: "ABIERTA" as JobStatus }],
    queryFn: () => jobsService.getJobs({ estado: "ABIERTA" }),
  });
};

import { useQuery } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobsService.getJobs(),
  });
};

export const useJobStats = () => {
  return useQuery({
    queryKey: ["jobStats"],
    queryFn: () => jobsService.getJobStats(),
  });
};

import { useQuery } from "@tanstack/react-query";
import { cvsService } from "../services/cvs.service";
import { CVS_KEYS } from "../queryKeys/cvs.keys";

/**
 * Fetch all CVs associated with a specific job/convocatoria.
 * Enabled only when jobId is a valid positive number.
 */
export const useCVsByJob = (jobId: number) => {
  return useQuery({
    queryKey: CVS_KEYS.job(jobId),
    queryFn: () => cvsService.getCVs({ job_id: jobId }),
    enabled: !!jobId && jobId > 0,
  });
};

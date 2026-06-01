import { useCandidateRanking } from "./useCandidateRanking";

/**
 * Specialized wrapper hook to retrieve ranking details by Job ID.
 */
export const useRankingByJob = (jobId: number) => {
  return useCandidateRanking(jobId);
};

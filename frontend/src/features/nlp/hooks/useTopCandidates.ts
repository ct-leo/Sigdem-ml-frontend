import { useCandidateRanking } from "./useCandidateRanking";

/**
 * Custom hook to retrieve the Top 3 candidates for a specific job ranking.
 */
export const useTopCandidates = (jobId: number) => {
  const queryResult = useCandidateRanking(jobId);

  const topCandidates = queryResult.data?.ranking
    ? [...queryResult.data.ranking]
        .sort((a, b) => b.compatibilidad - a.compatibilidad)
        .slice(0, 3)
    : [];

  return {
    ...queryResult,
    topCandidates,
  };
};

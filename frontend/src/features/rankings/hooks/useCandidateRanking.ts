import { useQuery } from "@tanstack/react-query";
import { rankingsService } from "../services/rankings.service";

export const useCandidateRanking = (id: string) => {
  return useQuery({
    queryKey: ["candidateRanking", id],
    queryFn: () => rankingsService.getRankingById(id),
    enabled: !!id,
  });
};

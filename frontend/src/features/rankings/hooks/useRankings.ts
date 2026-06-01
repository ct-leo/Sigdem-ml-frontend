import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rankingsService } from "../services/rankings.service";
import type { CandidateRanking } from "../types/ranking.types";

export const useRankings = () => {
  return useQuery({
    queryKey: ["rankings"],
    queryFn: () => rankingsService.getRankings(),
  });
};

export const useRankingStatistics = () => {
  return useQuery({
    queryKey: ["rankingStatistics"],
    queryFn: () => rankingsService.getRankingStatistics(),
  });
};

export const useRankingInsight = () => {
  return useQuery({
    queryKey: ["rankingInsight"],
    queryFn: () => rankingsService.getRankingInsight(),
  });
};

export const useUpdateRankingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CandidateRanking["status"] }) =>
      rankingsService.updateRankingStatus(id, status),
    onSuccess: (updatedRanking) => {
      queryClient.invalidateQueries({ queryKey: ["rankings"] });
      queryClient.invalidateQueries({ queryKey: ["candidateRanking", updatedRanking.id] });
      queryClient.invalidateQueries({ queryKey: ["rankingStatistics"] });
    },
  });
};

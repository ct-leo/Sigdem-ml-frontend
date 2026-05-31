import type { CandidateRanking, RankingStatistics, RankingInsight } from "../types/ranking.types";
import { getInitialMockRankings, saveMockRankings, MOCK_STATISTICS, MOCK_INSIGHT } from "../data/mockRankings";

const DELAY = 600;

export const rankingsService = {
  getRankings: async (): Promise<CandidateRanking[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getInitialMockRankings());
      }, DELAY);
    });
  },

  getRankingById: async (id: string): Promise<CandidateRanking | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getInitialMockRankings();
        const found = list.find((c) => c.id === id) || null;
        resolve(found);
      }, DELAY);
    });
  },

  updateRankingStatus: async (
    id: string,
    status: CandidateRanking["status"]
  ): Promise<CandidateRanking> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const list = getInitialMockRankings();
        const idx = list.findIndex((c) => c.id === id);
        if (idx === -1) {
          reject(new Error("Candidato no encontrado en el ranking"));
          return;
        }

        const updatedRanking: CandidateRanking = {
          ...list[idx],
          status,
        };

        const updatedList = [...list];
        updatedList[idx] = updatedRanking;
        saveMockRankings(updatedList);
        resolve(updatedRanking);
      }, DELAY);
    });
  },

  getRankingStatistics: async (): Promise<RankingStatistics> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getInitialMockRankings();
        const totalEvaluated = MOCK_STATISTICS.totalEvaluated;
        const topScore = list.length > 0 ? Math.max(...list.map((c) => c.scoreIA)) : MOCK_STATISTICS.topScore;
        const averageComp = list.length > 0 
          ? Math.round(list.reduce((sum, c) => sum + c.compatibilityPercentage, 0) / list.length)
          : MOCK_STATISTICS.averageCompatibility;

        const highlightedCount = list.filter((c) => c.scoreIA >= 90).length;

        resolve({
          totalEvaluated,
          averageCompatibility: averageComp,
          topScore,
          highlightedCount,
          analyzedJobsCount: MOCK_STATISTICS.analyzedJobsCount,
        });
      }, DELAY);
    });
  },

  getRankingInsight: async (): Promise<RankingInsight> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_INSIGHT);
      }, DELAY);
    });
  },
};

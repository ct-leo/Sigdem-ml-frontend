import apiClient from "../../../api/axios";
import type {
  CVMatchRequest,
  CVMatchResponse,
  RankingResponse,
} from "../types/nlp.types";

export const nlpService = {
  /**
   * POST /ml/cv/match
   * Compares a CV with a job offer using NLP matching.
   */
  matchCV: async (data: CVMatchRequest): Promise<CVMatchResponse> => {
    const response = await apiClient.post<CVMatchResponse>("/ml/cv/match", data);
    return response.data;
  },

  /**
   * GET /ml/cv/ranking/{job_id}
   * Retrieves the candidates ranking for a specific job.
   */
  getRanking: async (jobId: number): Promise<RankingResponse> => {
    const response = await apiClient.get<RankingResponse>(`/ml/cv/ranking/${jobId}`);
    return response.data;
  },
};

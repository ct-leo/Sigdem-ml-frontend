import { apiClient } from "../../../api/axios";
import type {
  TrainModelResponse,
  ModelMetrics,
  ClassifyPriorityRequest,
  ClassifyPriorityResponse,
  PredictTramiteResponse
} from "../types/mlTramites.types";

class MlTramitesService {
  async trainModel(): Promise<TrainModelResponse> {
    const response = await apiClient.post<TrainModelResponse>("/ml/tramites/train");
    return response.data;
  }

  async getMetrics(): Promise<ModelMetrics> {
    const response = await apiClient.get<ModelMetrics>("/ml/tramites/metrics");
    return response.data;
  }

  async classifyPriority(data: ClassifyPriorityRequest): Promise<ClassifyPriorityResponse> {
    const response = await apiClient.post<ClassifyPriorityResponse>("/ml/tramites/classify", data);
    return response.data;
  }

  async predictTramite(id: number): Promise<PredictTramiteResponse> {
    const response = await apiClient.post<PredictTramiteResponse>(`/ml/tramites/${id}/predict`);
    return response.data;
  }
}

export const mlTramitesService = new MlTramitesService();

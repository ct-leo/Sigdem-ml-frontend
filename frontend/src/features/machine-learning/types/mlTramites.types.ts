export interface TrainModelResponse {
  message: string;
  accuracy: number;
  total_samples: number;
}

export interface ModelMetrics {
  model_name: string;
  algorithm: string;
  accuracy: number;
  total_samples: number;
  labels: string[];
}

export interface ClassifyPriorityRequest {
  tipo_tramite: string;
  area_responsable: string;
  dias_espera: number;
  cantidad_documentos: number;
  tiene_observaciones: boolean;
  es_urgente: boolean;
}

export interface ClassifyPriorityResponse {
  prioridad: string;
  confidence: number;
}

export interface PredictTramiteResponse {
  tramite_id: number;
  codigo: string;
  prioridad: string;
  confidence: number;
}

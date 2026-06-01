export type MLModelStatus = "Activo" | "Entrenando" | "Actualizando" | "Error";

export type MLPredictionStatus = "Aplicada" | "Revisada" | "Corregida";

export interface MLModel {
  name: string;
  version: string;
  status: MLModelStatus;
  lastUpdatedAt: string; // ISO string
  trainedRecordsCount: number;
  totalPredictionsCount: number;
}

export interface MLMetrics {
  accuracy: number; // e.g. 94.2
  precision: number; // e.g. 92.8
  recall: number; // e.g. 91.4
  f1Score: number; // e.g. 92.1
  accuracyVariation: string; // e.g. "+0.4%"
  precisionVariation: string;
  recallVariation: string;
  f1ScoreVariation: string;
}

export interface ConfusionMatrixCell {
  actual: string; // "Crítica" | "Alta" | "Media" | "Baja"
  predicted: string;
  count: number;
  percentage: number;
  type: "TP" | "FP" | "FN" | "TN";
}

export interface ConfusionMatrixData {
  matrix: ConfusionMatrixCell[];
  labels: string[];
}

export interface PredictionDistribution {
  name: string; // "Crítica" | "Alta" | "Media" | "Baja"
  value: number; // Count
  percentage: number;
  color: string;
}

export interface MLPrediction {
  id: string;
  tramiteCode: string;
  type: string;
  predictedPriority: "Crítica" | "Alta" | "Media" | "Baja";
  confidence: number; // percentage, e.g. 95
  createdAt: string; // ISO string
  status: MLPredictionStatus;
}

export interface MonthlyPredictionTrend {
  month: string; // "Ene", "Feb", etc.
  Baja: number;
  Media: number;
  Alta: number;
  Crítica: number;
  total: number;
}

export interface ExecutiveSummary {
  totalPredictions: number;
  highPriorityPredictions: number;
  criticalPredictions: number;
  overallAccuracy: number;
  averageInferenceTimeMs: number; // average time e.g. 45ms
}

export interface MLDataPayload {
  model: MLModel;
  metrics: MLMetrics;
  confusionMatrix: ConfusionMatrixData;
  distribution: PredictionDistribution[];
  recentPredictions: MLPrediction[];
  trends: MonthlyPredictionTrend[];
  summary: ExecutiveSummary;
}

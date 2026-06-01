import type { MLDataPayload } from "../types/ml.types";

export const MOCK_ML_DATA: MLDataPayload = {
  model: {
    name: "Random Forest Classifier",
    version: "v1.0",
    status: "Activo",
    lastUpdatedAt: "2026-05-28T18:30:00Z",
    trainedRecordsCount: 24500,
    totalPredictionsCount: 12840,
  },
  metrics: {
    accuracy: 94.2,
    precision: 92.8,
    recall: 91.4,
    f1Score: 92.1,
    accuracyVariation: "+0.4%",
    precisionVariation: "+0.8%",
    recallVariation: "-0.2%",
    f1ScoreVariation: "+0.3%",
  },
  confusionMatrix: {
    labels: ["Crítica", "Alta", "Media", "Baja"],
    matrix: [
      { actual: "Crítica", predicted: "Crítica", count: 280, percentage: 92.1, type: "TP" },
      { actual: "Crítica", predicted: "Alta", count: 18, percentage: 5.9, type: "FN" },
      { actual: "Crítica", predicted: "Media", count: 6, percentage: 2.0, type: "FN" },
      { actual: "Crítica", predicted: "Baja", count: 0, percentage: 0.0, type: "FN" },

      { actual: "Alta", predicted: "Crítica", count: 12, percentage: 1.4, type: "FP" },
      { actual: "Alta", predicted: "Alta", count: 790, percentage: 91.9, type: "TP" },
      { actual: "Alta", predicted: "Media", count: 48, percentage: 5.6, type: "FN" },
      { actual: "Alta", predicted: "Baja", count: 10, percentage: 1.1, type: "FN" },

      { actual: "Media", predicted: "Crítica", count: 2, percentage: 0.1, type: "FP" },
      { actual: "Media", predicted: "Alta", count: 32, percentage: 1.8, type: "FP" },
      { actual: "Media", predicted: "Media", count: 1680, percentage: 95.5, type: "TP" },
      { actual: "Media", predicted: "Baja", count: 46, percentage: 2.6, type: "FN" },

      { actual: "Baja", predicted: "Crítica", count: 0, percentage: 0.0, type: "FP" },
      { actual: "Baja", predicted: "Alta", count: 5, percentage: 0.2, type: "FP" },
      { actual: "Baja", predicted: "Media", count: 52, percentage: 2.1, type: "FP" },
      { actual: "Baja", predicted: "Baja", count: 2380, percentage: 97.7, type: "TP" },
    ],
  },
  distribution: [
    { name: "Crítica", value: 340, percentage: 6.8, color: "#DC2626" }, // Danger color
    { name: "Alta", value: 1120, percentage: 22.4, color: "#D4AA45" }, // Golden Sand
    { name: "Media", value: 1850, percentage: 37.0, color: "#163B70" }, // Navy Blue
    { name: "Baja", value: 1690, percentage: 33.8, color: "#7DAA74" }, // Municipal Green
  ],
  recentPredictions: [
    {
      id: "pred-001",
      tramiteCode: "EXP-2026-LC-08912",
      type: "Licencia Comercial",
      predictedPriority: "Alta",
      confidence: 96.4,
      createdAt: "2026-05-31T14:15:30Z",
      status: "Aplicada",
    },
    {
      id: "pred-002",
      tramiteCode: "EXP-2026-PC-44102",
      type: "Permiso Construcción",
      predictedPriority: "Media",
      confidence: 89.2,
      createdAt: "2026-05-31T13:45:00Z",
      status: "Aplicada",
    },
    {
      id: "pred-003",
      tramiteCode: "EXP-2026-RC-00561",
      type: "Reclamo Ciudadano",
      predictedPriority: "Crítica",
      confidence: 98.1,
      createdAt: "2026-05-31T12:05:00Z",
      status: "Revisada",
    },
    {
      id: "pred-004",
      tramiteCode: "EXP-2026-DC-23091",
      type: "Certificado Defensa Civil",
      predictedPriority: "Alta",
      confidence: 94.7,
      createdAt: "2026-05-31T11:20:00Z",
      status: "Aplicada",
    },
    {
      id: "pred-005",
      tramiteCode: "EXP-2026-EX-11045",
      type: "Solicitud Exoneración",
      predictedPriority: "Baja",
      confidence: 76.5,
      createdAt: "2026-05-31T10:10:00Z",
      status: "Corregida",
    },
    {
      id: "pred-006",
      tramiteCode: "EXP-2026-PL-00918",
      type: "Plano Catastral",
      predictedPriority: "Media",
      confidence: 85.8,
      createdAt: "2026-05-31T09:30:00Z",
      status: "Aplicada",
    },
    {
      id: "pred-007",
      tramiteCode: "EXP-2026-AI-88301",
      type: "Acta Inspección",
      predictedPriority: "Crítica",
      confidence: 97.4,
      createdAt: "2026-05-31T08:00:00Z",
      status: "Aplicada",
    },
  ],
  trends: [
    { month: "Dic", Baja: 420, Media: 510, Alta: 310, Crítica: 85, total: 1325 },
    { month: "Ene", Baja: 480, Media: 590, Alta: 350, Crítica: 92, total: 1512 },
    { month: "Feb", Baja: 510, Media: 630, Alta: 390, Crítica: 104, total: 1634 },
    { month: "Mar", Baja: 620, Media: 710, Alta: 420, Crítica: 110, total: 1860 },
    { month: "Abr", Baja: 590, Media: 680, Alta: 450, Crítica: 98, total: 1818 },
    { month: "May", Baja: 690, Media: 850, Alta: 520, Crítica: 120, total: 2180 },
  ],
  summary: {
    totalPredictions: 12840,
    highPriorityPredictions: 2880,
    criticalPredictions: 870,
    overallAccuracy: 94.2,
    averageInferenceTimeMs: 38,
  },
};

export type ReportType = "Tramites" | "RRHH" | "Productividad" | "IA";

export interface ReportMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export interface ReportInsight {
  id: string;
  title: string;
  description: string;
  category: "efficiency" | "volume" | "accuracy" | "warning";
  timestamp: string;
}

export interface TramitesReportData {
  summary: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    critical: number;
  };
  stateDistribution: { name: string; value: number }[];
  areaDistribution: { name: string; value: number }[];
  monthlyEvolution: { month: string; cantidad: number }[];
  operationalLoad: { date: string; carga: number }[];
}

export interface RRHHReportData {
  summary: {
    activeJobs: number;
    closedJobs: number;
    processedCVs: number;
    averageCompatibility: number;
    highlightedCount: number;
  };
  areaDistribution: { name: string; value: number }[];
  candidateStateDistribution: { name: string; value: number }[];
  monthlyApplications: { month: string; postulantes: number }[];
}

export interface ProductivityReportData {
  summary: {
    averageAttentionTime: number; // in hours
    processedDocuments: number;
    activeUsers: number;
    completedProcesses: number;
  };
  monthlyProductivity: { month: string; completados: number }[];
  operationalLoad: { hour: string; expedientes: number }[];
  areaPerformance: { name: string; eficiencia: number }[];
}

export interface AIReportData {
  summary: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    totalPredictions: number;
  };
  confusionMatrix: { actual: string; predicted: string; count: number }[];
  priorityDistribution: { name: string; value: number }[];
  monthlyPredictions: { month: string; predicciones: number }[];
  metricsEvolution: { month: string; accuracy: number; precision: number; recall: number }[];
}

export interface ReportsGlobalStatistics {
  totalReports: number;
  monitoredMetrics: number;
  generatedExports: number;
  activeUsersCount: number;
  analyzedProcessesCount: number;
}

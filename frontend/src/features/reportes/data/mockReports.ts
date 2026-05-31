import type {
  TramitesReportData,
  RRHHReportData,
  ProductivityReportData,
  AIReportData,
  ReportsGlobalStatistics,
  ReportInsight
} from "../types/report.types";

export const MOCK_GLOBAL_STATS: ReportsGlobalStatistics = {
  totalReports: 4,
  monitoredMetrics: 24,
  generatedExports: 142,
  activeUsersCount: 48,
  analyzedProcessesCount: 2840,
};

export const MOCK_TRAMITES_REPORT: TramitesReportData = {
  summary: {
    total: 342,
    pending: 88,
    approved: 214,
    rejected: 40,
    critical: 24,
  },
  stateDistribution: [
    { name: "Aprobados", value: 214 },
    { name: "En Revisión", value: 88 },
    { name: "Rechazados", value: 40 },
  ],
  areaDistribution: [
    { name: "Licencias", value: 142 },
    { name: "Rentas", value: 95 },
    { name: "Catastro", value: 75 },
    { name: "Obras", value: 30 },
  ],
  monthlyEvolution: [
    { month: "Ene", cantidad: 65 },
    { month: "Feb", cantidad: 80 },
    { month: "Mar", cantidad: 95 },
    { month: "Abr", cantidad: 110 },
    { month: "May", cantidad: 142 },
  ],
  operationalLoad: [
    { date: "May 10", carga: 45 },
    { date: "May 15", carga: 60 },
    { date: "May 20", carga: 80 },
    { date: "May 25", carga: 95 },
    { date: "May 30", carga: 120 },
  ],
};

export const MOCK_RRHH_REPORT: RRHHReportData = {
  summary: {
    activeJobs: 8,
    closedJobs: 14,
    processedCVs: 182,
    averageCompatibility: 82,
    highlightedCount: 28,
  },
  areaDistribution: [
    { name: "Administración", value: 40 },
    { name: "Obras Públicas", value: 30 },
    { name: "Fiscalización", value: 62 },
    { name: "Mesa de Partes", value: 50 },
  ],
  candidateStateDistribution: [
    { name: "Preseleccionado", value: 42 },
    { name: "Aprobado", value: 18 },
    { name: "En Revisión", value: 92 },
    { name: "Descartado", value: 30 },
  ],
  monthlyApplications: [
    { month: "Ene", postulantes: 35 },
    { month: "Feb", postulantes: 50 },
    { month: "Mar", postulantes: 62 },
    { month: "Abr", postulantes: 88 },
    { month: "May", postulantes: 182 },
  ],
};

export const MOCK_PRODUCTIVITY_REPORT: ProductivityReportData = {
  summary: {
    averageAttentionTime: 28,
    processedDocuments: 1420,
    activeUsers: 48,
    completedProcesses: 950,
  },
  monthlyProductivity: [
    { month: "Ene", completados: 120 },
    { month: "Feb", completados: 150 },
    { month: "Mar", completados: 190 },
    { month: "Abr", completados: 230 },
    { month: "May", completados: 260 },
  ],
  operationalLoad: [
    { hour: "08:00", expedientes: 25 },
    { hour: "10:00", expedientes: 75 },
    { hour: "12:00", expedientes: 110 },
    { hour: "14:00", expedientes: 45 },
    { hour: "16:00", expedientes: 90 },
  ],
  areaPerformance: [
    { name: "Tecnologías", eficiencia: 96 },
    { name: "Recursos Humanos", eficiencia: 92 },
    { name: "Administración", eficiencia: 88 },
    { name: "Obras", eficiencia: 74 },
  ],
};

export const MOCK_AI_REPORT: AIReportData = {
  summary: {
    accuracy: 94.2,
    precision: 92.5,
    recall: 93.8,
    f1Score: 93.1,
    totalPredictions: 4820,
  },
  confusionMatrix: [
    { actual: "Crítico", predicted: "Crítico", count: 85 },
    { actual: "Crítico", predicted: "Normal", count: 5 },
    { actual: "Normal", predicted: "Crítico", count: 8 },
    { actual: "Normal", predicted: "Normal", count: 402 },
  ],
  priorityDistribution: [
    { name: "Crítica", value: 98 },
    { name: "Alta", value: 342 },
    { name: "Media", value: 1220 },
    { name: "Baja", value: 3160 },
  ],
  monthlyPredictions: [
    { month: "Ene", predicciones: 600 },
    { month: "Feb", predicciones: 850 },
    { month: "Mar", predicciones: 1100 },
    { month: "Abr", predicciones: 1400 },
    { month: "May", predicciones: 4820 },
  ],
  metricsEvolution: [
    { month: "Ene", accuracy: 91.2, precision: 89.5, recall: 90.0 },
    { month: "Feb", accuracy: 92.0, precision: 90.2, recall: 91.5 },
    { month: "Mar", accuracy: 93.1, precision: 91.8, recall: 92.4 },
    { month: "Abr", accuracy: 93.8, precision: 92.0, recall: 93.1 },
    { month: "May", accuracy: 94.2, precision: 92.5, recall: 93.8 },
  ],
};

export const MOCK_INSIGHTS: ReportInsight[] = [
  {
    id: "ins-001",
    title: "Congestión Crítica en Mesa de Partes",
    description: "El área de Licencias concentra el 41% de la carga operativa general de expedientes.",
    category: "efficiency",
    timestamp: "Hace 2 horas",
  },
  {
    id: "ins-002",
    title: "Postulación Altamente Concurrente",
    description: "Recursos Humanos registra un incremento del 106% en currículos procesados para fiscalización municipal.",
    category: "volume",
    timestamp: "Hace 4 horas",
  },
  {
    id: "ins-003",
    title: "Estabilidad en Monitoreo de IA",
    description: "La precisión del modelo Random Forest se mantiene en un 94.2% con fluctuaciones marginales.",
    category: "accuracy",
    timestamp: "Hace 1 día",
  },
  {
    id: "ins-004",
    title: "Demora de Atención Detectada",
    description: "El área de Obras presenta un tiempo promedio de resolución de 42 horas, superando la meta de 24 horas.",
    category: "warning",
    timestamp: "Hace 1 día",
  },
];

import apiClient from "../../../api/axios";
import type {
  TramitesReport,
  DocumentsReport,
  RRHHReport,
  NotificationsReport,
} from "../types/reports.types";
import type {
  AIReportData,
  ProductivityReportData,
  ReportsGlobalStatistics,
  ReportInsight,
} from "../types/report.types";

export const reportsService = {
  /**
   * GET /reports/tramites
   * Fetch structured Tramites summary report.
   */
  getTramitesReport: async (): Promise<TramitesReport> => {
    const response = await apiClient.get<TramitesReport>("/reports/tramites");
    return response.data;
  },

  /**
   * GET /reports/documents
   * Fetch structured Document Summary report.
   */
  getDocumentsReport: async (): Promise<DocumentsReport> => {
    const response = await apiClient.get<DocumentsReport>("/reports/documents");
    return response.data;
  },

  /**
   * GET /reports/rrhh
   * Fetch structured Human Resources / Convocatorias Summary report.
   */
  getRRHHReport: async (): Promise<RRHHReport> => {
    const response = await apiClient.get<RRHHReport>("/reports/rrhh");
    return response.data;
  },

  /**
   * GET /reports/notifications
   * Fetch structured Email dispatch summary report.
   */
  getNotificationsReport: async (): Promise<NotificationsReport> => {
    const response = await apiClient.get<NotificationsReport>("/reports/notifications");
    return response.data;
  },

  /**
   * GET /reports/tramites/pdf
   * Download Tramites report as PDF blob.
   */
  downloadTramitesPDF: async (): Promise<Blob> => {
    const response = await apiClient.get("/reports/tramites/pdf", {
      responseType: "blob",
      timeout: 30000,
    });
    return response.data;
  },

  /**
   * GET /reports/documents/pdf
   * Download Documents report as PDF blob.
   */
  downloadDocumentsPDF: async (): Promise<Blob> => {
    const response = await apiClient.get("/reports/documents/pdf", {
      responseType: "blob",
      timeout: 30000,
    });
    return response.data;
  },

  /**
   * GET /reports/rrhh/pdf
   * Download RRHH / Convocatorias report as PDF blob.
   */
  downloadRRHHPDF: async (): Promise<Blob> => {
    const response = await apiClient.get("/reports/rrhh/pdf", {
      responseType: "blob",
      timeout: 30000,
    });
    return response.data;
  },

  /**
   * GET /reports/notifications/pdf
   * Download Email Notifications report as PDF blob.
   */
  downloadNotificationsPDF: async (): Promise<Blob> => {
    const response = await apiClient.get("/reports/notifications/pdf", {
      responseType: "blob",
      timeout: 30000,
    });
    return response.data;
  },

  /**
   * getAIReport
   * Mock-fallback for pre-existing AI report metrics page.
   */
  getAIReport: async (): Promise<AIReportData> => {
    return {
      summary: {
        accuracy: 94.8,
        precision: 93.5,
        recall: 92.4,
        f1Score: 92.9,
        totalPredictions: 4120,
      },
      confusionMatrix: [
        { actual: "BAJA", predicted: "BAJA", count: 850 },
        { actual: "MEDIA", predicted: "MEDIA", count: 1200 },
        { actual: "ALTA", predicted: "ALTA", count: 980 },
        { actual: "CRITICA", predicted: "CRITICA", count: 410 },
      ],
      priorityDistribution: [
        { name: "Baja", value: 890 },
        { name: "Media", value: 1240 },
        { name: "Alta", value: 1020 },
        { name: "Crítica", value: 430 },
      ],
      monthlyPredictions: [
        { month: "Ene", predicciones: 280 },
        { month: "Feb", predicciones: 320 },
        { month: "Mar", predicciones: 410 },
        { month: "Abr", predicciones: 490 },
      ],
      metricsEvolution: [
        { month: "Ene", accuracy: 0.92, precision: 0.91, recall: 0.90 },
        { month: "Feb", accuracy: 0.93, precision: 0.92, recall: 0.91 },
      ],
    };
  },

  /**
   * getProductivityReport
   * Mock-fallback for pre-existing Productivity report page.
   */
  getProductivityReport: async (): Promise<ProductivityReportData> => {
    return {
      summary: {
        averageAttentionTime: 2.4,
        processedDocuments: 12450,
        activeUsers: 48,
        completedProcesses: 980,
      },
      monthlyProductivity: [
        { month: "Ene", completados: 60 },
        { month: "Feb", completados: 85 },
        { month: "Mar", completados: 120 },
      ],
      operationalLoad: [
        { hour: "08:00", expedientes: 5 },
        { hour: "10:00", expedientes: 25 },
        { hour: "12:00", expedientes: 40 },
      ],
      areaPerformance: [
        { name: "RRHH", eficiencia: 95 },
        { name: "Tesorería", eficiencia: 88 },
      ],
    };
  },

  /**
   * getGlobalStatistics
   * Mock-fallback for main reports page.
   */
  getGlobalStatistics: async (): Promise<ReportsGlobalStatistics> => {
    return {
      totalReports: 18,
      monitoredMetrics: 42,
      generatedExports: 310,
      activeUsersCount: 48,
      analyzedProcessesCount: 1248,
    };
  },

  /**
   * getInsights
   * Mock-fallback for main reports page insights panel.
   */
  getInsights: async (): Promise<ReportInsight[]> => {
    return [
      {
        id: "ins-1",
        title: "Optimización de Flujo Operativo",
        description: "Se observa una reducción del 14% en los tiempos promedio de revisión de expedientes.",
        category: "efficiency",
        timestamp: "Hace 10 min",
      },
      {
        id: "ins-2",
        title: "Clasificación IA Consolidada",
        description: "El clasificador cognitivo de priorización opera con un 94.8% de precisión global.",
        category: "accuracy",
        timestamp: "Hace 1 hora",
      },
    ];
  },
};
export default reportsService;

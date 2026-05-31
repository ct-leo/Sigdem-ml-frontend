import type {
  TramitesReportData,
  RRHHReportData,
  ProductivityReportData,
  AIReportData,
  ReportsGlobalStatistics,
  ReportInsight
} from "../types/report.types";
import {
  MOCK_GLOBAL_STATS,
  MOCK_TRAMITES_REPORT,
  MOCK_RRHH_REPORT,
  MOCK_PRODUCTIVITY_REPORT,
  MOCK_AI_REPORT,
  MOCK_INSIGHTS
} from "../data/mockReports";

const DELAY = 600;

export const reportsService = {
  getGlobalStatistics: async (): Promise<ReportsGlobalStatistics> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_GLOBAL_STATS);
      }, DELAY);
    });
  },

  getTramitesReport: async (): Promise<TramitesReportData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TRAMITES_REPORT);
      }, DELAY);
    });
  },

  getRRHHReport: async (): Promise<RRHHReportData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_RRHH_REPORT);
      }, DELAY);
    });
  },

  getProductivityReport: async (): Promise<ProductivityReportData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTIVITY_REPORT);
      }, DELAY);
    });
  },

  getAIReport: async (): Promise<AIReportData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_AI_REPORT);
      }, DELAY);
    });
  },

  getInsights: async (): Promise<ReportInsight[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_INSIGHTS);
      }, DELAY);
    });
  }
};

import apiClient from "../../../api/axios";
import type {
  DashboardSummary,
  TramiteStatus,
  TramitePriority,
  DashboardRRHH,
} from "../types/dashboard.types";

export const dashboardService = {
  /**
   * GET /dashboard/summary
   * Fetch general municipal dashboard counts.
   */
  getSummary: async (): Promise<DashboardSummary> => {
    const response = await apiClient.get<DashboardSummary>("/dashboard/summary");
    return response.data;
  },

  /**
   * GET /dashboard/tramites/status
   * Fetch Tramites distribution by status.
   */
  getTramitesByStatus: async (): Promise<TramiteStatus[]> => {
    const response = await apiClient.get<TramiteStatus[]>("/dashboard/tramites/status");
    return response.data;
  },

  /**
   * GET /dashboard/tramites/priorities
   * Fetch Tramites distribution by priority level.
   */
  getTramitesByPriority: async (): Promise<TramitePriority[]> => {
    const response = await apiClient.get<TramitePriority[]>("/dashboard/tramites/priorities");
    return response.data;
  },

  /**
   * GET /dashboard/rrhh
   * Fetch recruitment and ATS CV statistics.
   */
  getRRHHMetrics: async (): Promise<DashboardRRHH> => {
    const response = await apiClient.get<DashboardRRHH>("/dashboard/rrhh");
    return response.data;
  },
};

import type {
  TramitesReport,
  DocumentsReport,
  RRHHReport,
  NotificationsReport,
} from "../types/reports.types";

export const reportsMapper = {
  /**
   * Transforms TramitesReport data into a PieChart dataset.
   */
  mapTramitesToPieData: (data?: TramitesReport) => {
    if (!data) return [];
    return [
      { name: "Registrados", value: data.registrados, color: "#1e40af" },
      { name: "En revisión", value: data.en_revision, color: "#d97706" },
      { name: "Observados", value: data.observados, color: "#ea580c" },
      { name: "Aprobados", value: data.aprobados, color: "#749763" },
      { name: "Rechazados", value: data.rechazados, color: "#dc2626" },
      { name: "Finalizados", value: data.finalizados, color: "#047857" },
    ].filter((item) => item.value > 0);
  },

  /**
   * Transforms TramitesReport priorities into a BarChart dataset.
   */
  mapTramitePrioritiesToBarData: (data?: TramitesReport) => {
    if (!data?.prioridades) return [];
    return [
      { name: "Baja", total: data.prioridades.BAJA, color: "#3b82f6" },
      { name: "Media", total: data.prioridades.MEDIA, color: "#f59e0b" },
      { name: "Alta", total: data.prioridades.ALTA, color: "#ef4444" },
      { name: "Crítica", total: data.prioridades.CRITICA, color: "#7f1d1d" },
    ];
  },

  /**
   * Transforms DocumentsReport data into an OCR PieChart dataset.
   */
  mapDocumentsToPieData: (data?: DocumentsReport) => {
    if (!data) return [];
    return [
      { name: "Con OCR", value: data.documentos_con_ocr, color: "#10b981" },
      { name: "Sin OCR", value: data.documentos_sin_ocr, color: "#94a3b8" },
    ].filter((item) => item.value > 0);
  },

  /**
   * Transforms RRHHReport data into a BarChart dataset.
   */
  mapRRHHToBarData: (data?: RRHHReport) => {
    if (!data) return [];
    return [
      { name: "Convocatorias", total: data.total_convocatorias, color: "#6366f1" },
      { name: "CVs Procesados", total: data.cvs_procesados, color: "#10b981" },
      { name: "CVs Pendientes", total: data.cvs_pendientes, color: "#f59e0b" },
    ];
  },

  /**
   * Transforms NotificationsReport data into a PieChart dataset.
   */
  mapNotificationsToPieData: (data?: NotificationsReport) => {
    if (!data) return [];
    return [
      { name: "Enviadas", value: data.enviadas, color: "#10b981" },
      { name: "Pendientes", value: data.pendientes, color: "#f59e0b" },
      { name: "Fallidas", value: data.fallidas, color: "#f43f5e" },
      { name: "Simuladas", value: data.simuladas, color: "#3b82f6" },
    ].filter((item) => item.value > 0);
  },
};
export default reportsMapper;

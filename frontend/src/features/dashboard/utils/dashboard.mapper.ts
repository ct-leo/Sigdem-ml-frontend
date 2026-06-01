import type { TramiteStatus, TramitePriority } from "../types/dashboard.types";

export const dashboardMapper = {
  /**
   * Map TramiteStatus backend response for Recharts PieChart.
   */
  mapStatusToPieData: (data: TramiteStatus[] = []) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      REGISTRADO: { label: "Registrados", color: "#1e40af" }, // Navy blue
      EN_REVISION: { label: "En revisión", color: "#d97706" }, // Golden sand / amber
      OBSERVADO: { label: "Observados", color: "#ea580c" }, // Orange
      APROBADO: { label: "Aprobados", color: "#749763" }, // Municipal green
      RECHAZADO: { label: "Rechazados", color: "#dc2626" }, // Rose / red
      FINALIZADO: { label: "Finalizados", color: "#047857" }, // Emerald green
    };

    return data.map((item) => {
      const config = statusConfig[item.estado] || {
        label: item.estado,
        color: "#6b7280", // Slate gray fallback
      };
      return {
        name: config.label,
        value: item.total,
        color: config.color,
      };
    });
  },

  /**
   * Map TramitePriority backend response for Recharts BarChart.
   */
  mapPriorityToBarData: (data: TramitePriority[] = []) => {
    const priorityConfig: Record<string, { label: string; color: string }> = {
      BAJA: { label: "Baja", color: "#3b82f6" }, // Blue
      MEDIA: { label: "Media", color: "#f59e0b" }, // Amber
      ALTA: { label: "Alta", color: "#ef4444" }, // Red
      CRITICA: { label: "Crítica", color: "#7f1d1d" }, // Maroon
    };

    return data.map((item) => {
      const config = priorityConfig[item.prioridad] || {
        label: item.prioridad,
        color: "#6b7280",
      };
      return {
        priority: config.label,
        total: item.total,
        color: config.color,
      };
    });
  },
};
export default dashboardMapper;

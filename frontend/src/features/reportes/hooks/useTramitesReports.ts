import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import type { TramitesReportData } from "../types/report.types";

export const useTramitesReports = () => {
  return useQuery({
    queryKey: ["tramitesReport"],
    queryFn: async () => {
      const data = await reportsService.getTramitesReport();
      const mapped: TramitesReportData = {
        summary: {
          total: data.total_tramites,
          pending: data.registrados + data.en_revision + data.observados,
          approved: data.aprobados + data.finalizados,
          rejected: data.rechazados,
          critical: data.prioridades.CRITICA + data.prioridades.ALTA,
        },
        stateDistribution: [
          { name: "Registrados", value: data.registrados },
          { name: "En revisión", value: data.en_revision },
          { name: "Observados", value: data.observados },
          { name: "Aprobados", value: data.aprobados },
          { name: "Rechazados", value: data.rechazados },
          { name: "Finalizados", value: data.finalizados },
        ],
        areaDistribution: [
          { name: "Recursos Humanos", value: 420 },
          { name: "Tesorería", value: 350 },
          { name: "Obras", value: 280 },
          { name: "Licencias", value: 210 },
          { name: "Administración", value: 150 },
        ],
        monthlyEvolution: [
          { month: "Ene", cantidad: 120 },
          { month: "Feb", cantidad: 150 },
          { month: "Mar", cantidad: 180 },
          { month: "Abr", cantidad: 220 },
          { month: "May", cantidad: 200 },
          { month: "Jun", cantidad: 250 },
          { month: "Jul", cantidad: 310 },
          { month: "Ago", cantidad: 290 },
          { month: "Sep", cantidad: 340 },
          { month: "Oct", cantidad: 380 },
          { month: "Nov", cantidad: 420 },
          { month: "Dic", cantidad: 450 },
        ],
        operationalLoad: [
          { date: "Lun", carga: 120 },
          { date: "Mar", carga: 250 },
          { date: "Mie", carga: 180 },
          { date: "Jue", carga: 320 },
          { date: "Vie", carga: 410 },
          { date: "Sab", carga: 150 },
          { date: "Dom", carga: 80 },
        ],
      };
      return mapped;
    },
  });
};

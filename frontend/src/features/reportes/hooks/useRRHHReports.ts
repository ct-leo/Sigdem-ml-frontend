import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import type { RRHHReportData } from "../types/report.types";

export const useRRHHReports = () => {
  return useQuery({
    queryKey: ["rrhhReport"],
    queryFn: async () => {
      const data = await reportsService.getRRHHReport();
      const mapped: RRHHReportData = {
        summary: {
          activeJobs: data.abiertas,
          closedJobs: data.cerradas,
          processedCVs: data.cvs_procesados,
          averageCompatibility: 78, // default NLP average matching rate
          highlightedCount: data.total_convocatorias,
        },
        areaDistribution: [
          { name: "Sistemas", value: 4 },
          { name: "Finanzas", value: 2 },
          { name: "Administración", value: 3 },
        ],
        candidateStateDistribution: [
          { name: "Procesados", value: data.cvs_procesados },
          { name: "Pendientes", value: data.cvs_pendientes },
        ],
        monthlyApplications: [
          { month: "Ene", postulantes: 15 },
          { month: "Feb", postulantes: 22 },
          { month: "Mar", postulantes: 40 },
          { month: "Abr", postulantes: 35 },
        ],
      };
      return mapped;
    },
  });
};

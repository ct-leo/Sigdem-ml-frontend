import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { useRRHHReports } from "../hooks/useRRHHReports";
import { RRHHReportCharts } from "../components/RRHHReportCharts";
import { ExportActions } from "../components/ExportActions";
import { ArrowLeft, Megaphone, Users, Target, Award, Calendar } from "lucide-react";
import { StatCard } from "../../../components/ui/StatCard";

export const RRHHReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: reportData, isLoading } = useRRHHReports();

  if (isLoading || !reportData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xs font-semibold text-text-secondary select-none">
        Cargando reporte de reclutamiento...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate("/reportes")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
        <ExportActions reportTitle="Recursos Humanos Convocatorias" />
      </div>

      <PageHeader
        title="Reporte de Recursos Humanos"
        description="Supervisa convocatorias públicas vigentes, ingreso de currículos y compatibilidad de selección."
      />

      {/* Stats KPI Card Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Convocatorias Activas" value={reportData.summary.activeJobs} icon={Megaphone} delay={0.1} />
        <StatCard title="Convocatorias Cerradas" value={reportData.summary.closedJobs} icon={Calendar} delay={0.2} />
        <StatCard title="Currículos Procesados" value={reportData.summary.processedCVs} icon={Users} delay={0.3} />
        <StatCard title="Compatibilidad Promedio" value={`${reportData.summary.averageCompatibility}%`} icon={Target} delay={0.4} />
        <StatCard title="Candidatos Destacados" value={reportData.summary.highlightedCount} icon={Award} delay={0.5} />
      </div>

      {/* Main Charts */}
      <RRHHReportCharts data={reportData} />
    </div>
  );
};

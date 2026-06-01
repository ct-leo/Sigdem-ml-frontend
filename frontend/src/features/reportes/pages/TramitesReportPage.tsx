import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { useTramitesReports } from "../hooks/useTramitesReports";
import { TramitesReportCharts } from "../components/TramitesReportCharts";
import { ExportActions } from "../components/ExportActions";
import { ArrowLeft, FileText, CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import { StatCard } from "../../../components/ui/StatCard";

export const TramitesReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: reportData, isLoading } = useTramitesReports();

  if (isLoading || !reportData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xs font-semibold text-text-secondary select-none">
        Cargando reporte de trámites...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate("/reportes")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
        <ExportActions reportTitle="Gestión de Trámites" />
      </div>

      <PageHeader
        title="Reporte de Gestión de Trámites"
        description="Analiza el volumen de expedientes ingresados, tasas de aprobación y distribución de carga de trabajo."
      />

      {/* Stats KPI Card Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Registrados" value={reportData.summary.total} icon={FileText} delay={0.1} />
        <StatCard title="En Revisión" value={reportData.summary.pending} icon={Clock} delay={0.2} />
        <StatCard title="Aprobados" value={reportData.summary.approved} icon={CheckCircle} delay={0.3} />
        <StatCard title="Rechazados" value={reportData.summary.rejected} icon={XCircle} delay={0.4} />
        <StatCard title="Trámites Críticos" value={reportData.summary.critical} icon={AlertTriangle} delay={0.5} />
      </div>

      {/* Main Charts */}
      <TramitesReportCharts data={reportData} />
    </div>
  );
};

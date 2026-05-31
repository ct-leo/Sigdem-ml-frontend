import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { useProductivityReports } from "../hooks/useProductivityReports";
import { ProductivityCharts } from "../components/ProductivityCharts";
import { ExportActions } from "../components/ExportActions";
import { ArrowLeft, Clock, Files, Users, CheckCircle2 } from "lucide-react";
import { StatCard } from "../../../components/ui/StatCard";

export const ProductivityReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: reportData, isLoading } = useProductivityReports();

  if (isLoading || !reportData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xs font-semibold text-text-secondary select-none">
        Cargando reporte de productividad...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate("/reportes")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
        <ExportActions reportTitle="Productividad Institucional" />
      </div>

      <PageHeader
        title="Reporte de Productividad Institucional"
        description="Analiza los tiempos promedio de atención, tasas de resolución y rendimiento de las oficinas públicas."
      />

      {/* Stats KPI Card Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tiempo Atención Promedio" value={`${reportData.summary.averageAttentionTime} hrs`} icon={Clock} delay={0.1} />
        <StatCard title="Documentos Procesados" value={reportData.summary.processedDocuments} icon={Files} delay={0.2} />
        <StatCard title="Usuarios Activos" value={reportData.summary.activeUsers} icon={Users} delay={0.3} />
        <StatCard title="Procesos Finalizados" value={reportData.summary.completedProcesses} icon={CheckCircle2} delay={0.4} />
      </div>

      {/* Main Charts */}
      <ProductivityCharts data={reportData} />
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { useAIReports } from "../hooks/useAIReports";
import { AIReportCharts } from "../components/AIReportCharts";
import { ExportActions } from "../components/ExportActions";
import { ArrowLeft, Target, Award, ShieldAlert, Cpu } from "lucide-react";
import { StatCard } from "../../../components/ui/StatCard";

export const AIReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: reportData, isLoading } = useAIReports();

  if (isLoading || !reportData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xs font-semibold text-text-secondary select-none">
        Cargando reporte de inteligencia artificial...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate("/reportes")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
        <ExportActions reportTitle="Inteligencia Artificial Auditoría" />
      </div>

      <PageHeader
        title="Reporte de Inteligencia Artificial"
        description="Audita el desempeño técnico de las predicciones del modelo cognitivo de priorización municipal."
      />

      {/* Stats KPI Card Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Exactitud (Accuracy)" value={`${reportData.summary.accuracy}%`} icon={Target} delay={0.1} />
        <StatCard title="Precisión (Precision)" value={`${reportData.summary.precision}%`} icon={Award} delay={0.2} />
        <StatCard title="Sensibilidad (Recall)" value={`${reportData.summary.recall}%`} icon={ShieldAlert} delay={0.3} />
        <StatCard title="Medida F1 (F1 Score)" value={`${reportData.summary.f1Score}%`} icon={Cpu} delay={0.4} />
        <StatCard title="Predicciones Realizadas" value={reportData.summary.totalPredictions} icon={Cpu} delay={0.5} />
      </div>

      {/* Main Charts */}
      <AIReportCharts data={reportData} />
    </div>
  );
};

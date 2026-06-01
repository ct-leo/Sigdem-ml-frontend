import React from "react";
import type { ExecutiveSummary } from "../types/ml.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Activity, Clock, ShieldCheck, Target, AlertTriangle } from "lucide-react";

interface ModelPerformancePanelProps {
  summary?: ExecutiveSummary;
  isLoading: boolean;
}

export const ModelPerformancePanel: React.FC<ModelPerformancePanelProps> = ({
  summary,
  isLoading,
}) => {
  if (isLoading || !summary) {
    return (
      <div className="bg-white rounded-xl border border-border-color p-6 animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const items = [
    {
      label: "Inferencia Promedio",
      value: `${summary.averageInferenceTimeMs} ms`,
      icon: Clock,
      color: "text-navy-blue bg-navy-blue/5",
      description: "Tiempo promedio por clasificación",
    },
    {
      label: "Precisión General",
      value: `${summary.overallAccuracy}%`,
      icon: Target,
      color: "text-[#749763] bg-[#749763]/5",
      description: "Tasa de acierto global (Test Set)",
    },
    {
      label: "Expedientes Críticos",
      value: summary.criticalPredictions.toLocaleString(),
      icon: AlertTriangle,
      color: "text-[#DC2626] bg-[#DC2626]/5",
      description: "Trámites de prioridad crítica total",
    },
    {
      label: "Clasificación Automática",
      value: summary.totalPredictions.toLocaleString(),
      icon: ShieldCheck,
      color: "text-golden-sand bg-[#D4AA45]/5",
      description: "Total de gestiones clasificadas",
    },
  ];

  return (
    <Card className="shadow-sm border border-border-color">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4.5 h-4.5 text-navy-blue" />
          Resumen Ejecutivo de Rendimiento
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col p-4 bg-gray-50/40 border border-border-color/50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-text-secondary uppercase">
                  {item.label}
                </span>
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-black text-text-primary">{item.value}</h4>
                <p className="text-[10px] text-text-secondary mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

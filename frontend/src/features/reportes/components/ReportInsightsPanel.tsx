import React from "react";
import type { ReportInsight } from "../types/report.types";
import { Card, CardContent } from "../../../components/ui/Card";
import { Lightbulb, TrendingUp, Users, AlertTriangle, Brain } from "lucide-react";

interface ReportInsightsPanelProps {
  insights?: ReportInsight[];
  isLoading: boolean;
}

export const ReportInsightsPanel: React.FC<ReportInsightsPanelProps> = ({ insights, isLoading }) => {
  const getIcon = (cat: ReportInsight["category"]) => {
    switch (cat) {
      case "efficiency":
        return TrendingUp;
      case "volume":
        return Users;
      case "accuracy":
        return Brain;
      default:
        return AlertTriangle;
    }
  };

  const getColor = (cat: ReportInsight["category"]) => {
    switch (cat) {
      case "efficiency":
        return "text-[#749763] bg-[#749763]/10 border-[#749763]/25";
      case "volume":
        return "text-navy-blue bg-navy-blue/10 border-navy-blue/25";
      case "accuracy":
        return "text-[#7DAA74] bg-[#7DAA74]/10 border-[#7DAA74]/25";
      default:
        return "text-danger bg-red-50 border-red-200";
    }
  };

  return (
    <Card className="border border-border-color shadow-sm h-full select-none">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b border-border-color pb-3">
          <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5">
            <Lightbulb className="w-4.5 h-4.5 text-golden-sand" />
            Hallazgos de IA & Insights Ejecutivos
          </h3>
          <p className="text-xs text-text-secondary">
            Análisis y advertencias operativas autogeneradas por los algoritmos analíticos.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-48 text-xs font-semibold text-text-secondary">
            Cargando insights operativos...
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-1">
            {insights?.map((ins) => {
              const Icon = getIcon(ins.category);
              const colorClasses = getColor(ins.category);
              return (
                <div key={ins.id} className={`flex items-start gap-3 p-3.5 border rounded-xl ${colorClasses}`}>
                  <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-text-primary">{ins.title}</span>
                      <span className="text-[9px] font-bold text-text-secondary uppercase">{ins.timestamp}</span>
                    </div>
                    <span className="text-[10px] text-text-secondary leading-normal font-semibold mt-0.5">
                      {ins.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

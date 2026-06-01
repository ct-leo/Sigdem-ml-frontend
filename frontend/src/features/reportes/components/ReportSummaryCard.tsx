import React from "react";
import { Brain, Sparkles, TrendingUp, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";

export const ReportSummaryCard: React.FC = () => {
  const insights = [
    {
      title: "Optimización de Flujo Operativo",
      desc: "Se observa una reducción del 14% en los tiempos promedio de revisión de expedientes en Licencias, consolidando una tasa de respuesta de 2.1 días hábiles.",
      icon: TrendingUp,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      title: "Clasificación IA Consolidada",
      desc: "El motor de IA (priorización BPM cognitivo) operó con un 94.8% de precisión en la derivación automática de expedientes municipales.",
      icon: Brain,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20",
    },
    {
      title: "Digitalización DMS & OCR",
      desc: "La tasa de digitalización e indexación automática mediante OCR se elevó al 87.2% del volumen total de documentos ingresados en Mesa de Partes.",
      icon: Sparkles,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
    },
  ];

  return (
    <Card className="h-full flex flex-col select-none border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-blue-600 animate-pulse" />
          <CardTitle className="text-xs font-black uppercase text-slate-800 dark:text-white tracking-wider">
            Dictamen e Insights Ejecutivos (IA)
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-5 space-y-4">
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <p className="text-3xs text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider mb-1.5">
            Resumen de Gestión Institucional
          </p>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
            El sistema municipal SIGDEM-ML registra un flujo operativo estable y altamente automatizado. La digitalización DMS mediante OCR y la priorización cognitiva reducen significativamente el cuello de botella tradicional de la mesa de partes física.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {insights.map((insight) => (
            <div key={insight.title} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${insight.color}`}>
                <insight.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase leading-none">
                  {insight.title}
                </h4>
                <p className="text-3xs text-slate-500 dark:text-slate-400 font-semibold mt-1 leading-relaxed">
                  {insight.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default ReportSummaryCard;

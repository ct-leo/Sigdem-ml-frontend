import React from "react";
import type { ExecutiveSummary } from "../types/ml.types";
import { Card, CardContent } from "../../../components/ui/Card";
import { Bot, Sparkles, Shield, Cpu } from "lucide-react";

interface MLOverviewProps {
  summary?: ExecutiveSummary;
  isLoading: boolean;
}

export const MLOverview: React.FC<MLOverviewProps> = ({ summary, isLoading }) => {
  if (isLoading || !summary) {
    return (
      <div className="bg-white rounded-xl p-6 border animate-pulse h-28"></div>
    );
  }

  return (
    <Card className="shadow-sm border border-border-color bg-gradient-to-br from-navy-blue via-navy-blue to-blue-900 text-white overflow-hidden relative select-none">
      {/* Decorative vectors */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-xl pointer-events-none"></div>
      <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-golden-sand/5 rounded-full -mb-10 blur-lg pointer-events-none"></div>

      <CardContent className="p-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full text-xs font-semibold text-golden-sand border border-white/10">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Integración de Inteligencia Artificial
          </div>
          <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Clasificador Random Forest v1.0
          </h3>
          <p className="text-xs text-white/70 leading-relaxed">
            El motor de aprendizaje automático evalúa de forma autónoma el contenido, solicitante,
            asunto e historial de cada expediente para predecir su prioridad en mesa de partes. Esto acelera el
            despacho de trámites en un <strong className="text-white">40%</strong> y previene cuellos de botella en la administración municipal.
          </p>
        </div>

        <div className="flex gap-4 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="bg-white/10 border border-white/5 rounded-xl p-4 min-w-[120px] text-center">
            <Shield className="w-5 h-5 text-golden-sand mx-auto mb-1.5" />
            <span className="text-[9px] uppercase font-bold text-white/50 block">Confiabilidad</span>
            <span className="text-base font-extrabold text-white">99.8%</span>
          </div>

          <div className="bg-white/10 border border-white/5 rounded-xl p-4 min-w-[120px] text-center">
            <Cpu className="w-5 h-5 text-[#7DAA74] mx-auto mb-1.5" />
            <span className="text-[9px] uppercase font-bold text-white/50 block">Motor GPU</span>
            <span className="text-base font-extrabold text-white">Activo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import React from "react";
import { Card, CardContent } from "../../../components/ui/Card";
import { TrendingUp, Award, Clock, Lightbulb } from "lucide-react";
import type { RankingInsight } from "../types/ranking.types";

interface RankingInsightsPanelProps {
  insight?: RankingInsight;
  isLoading: boolean;
}

export const RankingInsightsPanel: React.FC<RankingInsightsPanelProps> = ({ insight, isLoading }) => {
  const average = insight?.generalAverage ?? 0;
  const bestSkill = insight?.bestSkillDetected ?? "...";
  const frequentTech = insight?.frequentTechnology ?? "...";
  const averageExp = insight?.averageExperienceYears ?? 0;

  return (
    <Card className="border border-border-color shadow-sm h-full">
      <CardContent className="p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5">
            <Lightbulb className="w-4.5 h-4.5 text-golden-sand" />
            Insights de IA & Talent Intelligence
          </h3>
          <p className="text-xs text-text-secondary">
            Análisis predictivo extraído automáticamente de la base de candidatos.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-48 text-xs font-semibold text-text-secondary">
            Cargando insights de talento...
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Stat Row 1: Average IA Score */}
            <div className="flex items-start gap-3 p-3 bg-[#749763]/5 border border-[#749763]/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-dashboard-green shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase font-black tracking-wider text-text-secondary">Puntuación Promedio General</span>
                <span className="text-sm font-extrabold text-text-primary">{average} pts sobre 100</span>
                <span className="text-[10px] text-text-secondary leading-normal">
                  Los candidatos superan el estándar institucional con un excelente desempeño cognitivo.
                </span>
              </div>
            </div>

            {/* Stat Row 2: Experiencia Promedio */}
            <div className="flex items-start gap-3 p-3 bg-navy-blue/5 border border-navy-blue/10 rounded-xl">
              <Clock className="w-5 h-5 text-navy-blue shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase font-black tracking-wider text-text-secondary">Experiencia Promedio Registrada</span>
                <span className="text-sm font-extrabold text-text-primary">{averageExp} Años de Trayectoria</span>
                <span className="text-[10px] text-text-secondary leading-normal">
                  Los perfiles preseleccionados demuestran estabilidad laboral y madurez técnica comprobable.
                </span>
              </div>
            </div>

            {/* Stat Row 3: Competencia más valorada */}
            <div className="flex items-start gap-3 p-3 bg-[#D4AA45]/5 border border-[#D4AA45]/10 rounded-xl">
              <Award className="w-5 h-5 text-golden-sand shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase font-black tracking-wider text-text-secondary">Núcleo de Habilidades Relevantes</span>
                <span className="text-sm font-extrabold text-text-primary">{bestSkill}</span>
                <span className="text-[10px] text-text-secondary leading-normal">
                  Tecnologías preferidas: <span className="font-bold">{frequentTech}</span>.
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

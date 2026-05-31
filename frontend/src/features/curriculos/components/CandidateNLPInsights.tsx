import React from "react";
import type { Curriculum } from "../types/curriculum.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Brain, Star, Award, Target, ListCollapse } from "lucide-react";

interface CandidateNLPInsightsProps {
  cv: Curriculum;
}

export const CandidateNLPInsights: React.FC<CandidateNLPInsightsProps> = ({ cv }) => {
  const { nlpInsight } = cv;

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-[#749763]"; // Dashboard Green
    if (score >= 70) return "bg-golden-sand";
    return "bg-danger";
  };

  return (
    <Card className="shadow-sm border border-border-color overflow-hidden select-none">
      <CardHeader className="bg-navy-blue text-white px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-white font-bold uppercase tracking-wider flex items-center gap-2">
          <Brain className="w-5 h-5 text-golden-sand animate-pulse" />
          Análisis NLP de Idoneidad
        </CardTitle>
        <span className="text-[10px] font-bold text-white/50 uppercase">Vertex AI Engine</span>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Progress Bar & Compatibility Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-text-primary uppercase flex items-center gap-1">
              <Target className="w-4 h-4 text-navy-blue" />
              Nivel de Ajuste Profesional
            </span>
            <span className="text-lg font-black text-navy-blue">{nlpInsight.compatibilityScore}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-border-color/25">
            <div
              className={`h-full ${getProgressColor(nlpInsight.compatibilityScore)}`}
              style={{ width: `${nlpInsight.compatibilityScore}%` }}
            ></div>
          </div>
        </div>

        {/* Quantities Grid */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border-color/60">
          <div className="flex flex-col p-3 bg-gray-50 border border-border-color/40 rounded-lg">
            <span className="text-[9px] uppercase font-bold text-text-secondary">Exp. Relevantes</span>
            <p className="text-sm font-black text-text-primary mt-1">{nlpInsight.experiencesCount} Cargos</p>
          </div>
          <div className="flex flex-col p-3 bg-gray-50 border border-border-color/40 rounded-lg">
            <span className="text-[9px] uppercase font-bold text-text-secondary">Certificaciones</span>
            <p className="text-sm font-black text-[#749763] mt-1">{nlpInsight.certificationsCount} Títulos</p>
          </div>
        </div>

        {/* Skills detected */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text-primary uppercase flex items-center gap-1">
            <Star className="w-4 h-4 text-navy-blue" />
            Habilidades Extraídas:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {nlpInsight.skillsDetected.map((skill, idx) => (
              <span
                key={idx}
                className="bg-navy-blue/5 text-navy-blue text-[10px] font-semibold py-1 px-2 rounded-lg border border-navy-blue/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Technologies found */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-text-primary uppercase flex items-center gap-1">
            <Award className="w-4 h-4 text-[#749763]" />
            Tecnologías Mapeadas:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {nlpInsight.technologiesFound.map((tech, idx) => (
              <span
                key={idx}
                className="bg-[#749763]/10 text-[#749763] text-[10px] font-semibold py-1 px-2 rounded-lg border border-[#749763]/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Keywords identified */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-text-primary uppercase flex items-center gap-1">
            <ListCollapse className="w-4 h-4 text-golden-sand" />
            Conceptos Clave (Keywords):
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {nlpInsight.keywordsIdentified.map((kw, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-text-primary text-[10px] font-semibold py-1 px-2 rounded-lg border border-gray-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

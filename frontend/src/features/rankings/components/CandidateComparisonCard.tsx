import React from "react";
import { Card, CardContent } from "../../../components/ui/Card";
import { GitCompare, CheckCircle, AlertCircle } from "lucide-react";
import type { CandidateRanking } from "../types/ranking.types";

interface CandidateComparisonCardProps {
  candidate: CandidateRanking;
  averageExperience: number;
  averageCompatibility: number;
}

export const CandidateComparisonCard: React.FC<CandidateComparisonCardProps> = ({
  candidate,
  averageExperience,
  averageCompatibility,
}) => {
  const compDiff = candidate.compatibilityPercentage - averageCompatibility;
  const expDiff = candidate.experienceYears - averageExperience;

  return (
    <Card className="border border-border-color shadow-sm w-full">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5">
            <GitCompare className="w-4.5 h-4.5 text-navy-blue" />
            Análisis de Comparación de Candidato vs. Promedio
          </h3>
          <p className="text-xs text-text-secondary">
            Comparativa directa de las aptitudes clave frente al estándar de postulantes registrados.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {/* Compatibility Row */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-text-primary">Compatibilidad ATS:</span>
              <span className="font-semibold text-text-secondary">
                Candidato: <span className="font-bold text-navy-blue">{candidate.compatibilityPercentage}%</span> | Promedio: <span className="font-bold">{averageCompatibility}%</span>
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-[#749763] h-full"
                style={{ width: `${candidate.compatibilityPercentage}%` }}
              />
              <div
                className="bg-navy-blue h-full opacity-35"
                style={{ width: `${Math.max(0, averageCompatibility - candidate.compatibilityPercentage)}%` }}
              />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold">
              {compDiff >= 0 ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-[#749763]" />
                  <span className="text-[#749763]">{`+${compDiff.toFixed(1)}% superior al promedio del área`}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-danger" />
                  <span className="text-danger">{`${compDiff.toFixed(1)}% por debajo del promedio del área`}</span>
                </>
              )}
            </div>
          </div>

          <hr className="border-border-color" />

          {/* Experience Row */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-text-primary">Años de Experiencia:</span>
              <span className="font-semibold text-text-secondary">
                Candidato: <span className="font-bold text-navy-blue">{candidate.experienceYears} años</span> | Promedio: <span className="font-bold">{averageExperience} años</span>
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden flex">
              <div
                className="bg-golden-sand h-full"
                style={{ width: `${Math.min(100, (candidate.experienceYears / 10) * 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold">
              {expDiff >= 0 ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-[#749763]" />
                  <span className="text-[#749763]">{`+${expDiff} años extra de experiencia profesional`}</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-danger" />
                  <span className="text-danger">{`${Math.abs(expDiff)} años por debajo del promedio`}</span>
                </>
              )}
            </div>
          </div>

          <hr className="border-border-color" />

          {/* Academic/Score row */}
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Estudios Candidato</span>
              <span className="text-text-primary">{candidate.academicLevel}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Estado en el Proceso</span>
              <span className="text-navy-blue font-bold">{candidate.status}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

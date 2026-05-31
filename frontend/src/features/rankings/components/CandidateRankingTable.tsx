import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import type { CandidateRanking } from "../types/ranking.types";
import { CandidateScoreBadge } from "./CandidateScoreBadge";
import { CurriculumStatusBadge } from "../../curriculos/components/CurriculumStatusBadge";

interface CandidateRankingTableProps {
  candidates: CandidateRanking[];
  isLoading: boolean;
}

export const CandidateRankingTable: React.FC<CandidateRankingTableProps> = ({ candidates, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-white border border-border-color rounded-xl p-8 text-center text-xs font-semibold text-text-secondary">
        Cargando listado de ranking de candidatos...
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="bg-white border border-border-color rounded-xl p-8 text-center text-xs font-semibold text-text-secondary">
        No se encontraron candidatos evaluados con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-color rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-semibold">
          <thead>
            <tr className="bg-light-bg text-text-secondary border-b border-border-color uppercase tracking-wider text-[10px]">
              <th className="px-6 py-4 font-black">Lugar / Rango</th>
              <th className="px-6 py-4 font-black">Candidato</th>
              <th className="px-6 py-4 font-black">Convocatoria</th>
              <th className="px-6 py-4 font-black text-center">Score IA</th>
              <th className="px-6 py-4 font-black text-center">Compatibilidad</th>
              <th className="px-6 py-4 font-black">Estado</th>
              <th className="px-6 py-4 font-black text-right">Ficha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color text-text-primary">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-light-bg/40 transition-colors">
                {/* Lugar / Rango */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-extrabold text-navy-blue">{candidate.position}</span>
                </td>

                {/* Candidato info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-text-primary text-sm">{candidate.candidateName}</span>
                    <span className="text-[10px] text-text-secondary flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-text-secondary" /> {candidate.city}
                    </span>
                  </div>
                </td>

                {/* Convocatoria info */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5 max-w-[240px]">
                    <span className="font-bold text-navy-blue line-clamp-1">{candidate.jobTitleAssociated}</span>
                    <span className="text-[10px] text-text-secondary font-mono font-bold">{candidate.codeAssociated}</span>
                  </div>
                </td>

                {/* Score IA */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="inline-block scale-90">
                    <CandidateScoreBadge score={candidate.scoreIA} />
                  </div>
                </td>

                {/* Compatibilidad */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="font-mono font-black text-navy-blue text-sm">
                    {candidate.compatibilityPercentage}%
                  </span>
                </td>

                {/* Estado */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="scale-90 origin-left">
                    <CurriculumStatusBadge status={candidate.status as any} />
                  </div>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => navigate(`/rankings/${candidate.id}`)}
                    className="p-1.5 hover:bg-navy-blue/10 text-navy-blue hover:text-[#23589b] rounded-lg transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

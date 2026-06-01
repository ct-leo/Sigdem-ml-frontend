import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Briefcase, GraduationCap, MapPin } from "lucide-react";
import type { CandidateRanking } from "../types/ranking.types";
import { CandidateScoreBadge } from "./CandidateScoreBadge";
import { CurriculumStatusBadge } from "../../curriculos/components/CurriculumStatusBadge";

interface CandidateRankingCardProps {
  candidate: CandidateRanking;
}

export const CandidateRankingCard: React.FC<CandidateRankingCardProps> = ({ candidate }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/rankings/${candidate.id}`);
  };

  const getPositionBadge = (pos: CandidateRanking["position"]) => {
    switch (pos) {
      case "1° Lugar":
        return "bg-gradient-to-r from-navy-blue to-[#1e4b85] text-white";
      case "2° Lugar":
        return "bg-gradient-to-r from-municipal-green to-[#6e9966] text-white";
      case "3° Lugar":
        return "bg-gradient-to-r from-golden-sand to-[#bfa13b] text-white";
      default:
        return "bg-gray-100 border border-gray-200 text-text-primary";
    }
  };

  return (
    <div className="bg-white border border-border-color rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4">
      {/* Top Header Row */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-extrabold text-text-primary text-base hover:text-navy-blue transition-colors cursor-pointer" onClick={handleViewDetails}>
              {candidate.candidateName}
            </h4>
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full select-none ${getPositionBadge(candidate.position)}`}>
              {candidate.position}
            </span>
          </div>
          <span className="text-xs text-text-secondary leading-normal flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-text-secondary" />
            {candidate.city}
          </span>
        </div>
        {/* IA Score Badge */}
        <CandidateScoreBadge score={candidate.scoreIA} />
      </div>

      {/* Associated Convocatoria Info */}
      <div className="bg-light-bg rounded-lg p-3 border border-border-color/60 flex flex-col gap-1">
        <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Convocatoria Relacionada</span>
        <span className="text-xs font-bold text-navy-blue line-clamp-1">{candidate.jobTitleAssociated}</span>
        <span className="text-[10px] font-mono font-bold text-text-secondary">{candidate.codeAssociated}</span>
      </div>

      {/* Meta Specs Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs text-text-primary">
        <div className="flex items-center gap-1.5 font-semibold">
          <Briefcase className="w-4 h-4 text-navy-blue shrink-0" />
          <span>{candidate.experienceYears} años exp.</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold">
          <GraduationCap className="w-4 h-4 text-[#7DAA74] shrink-0" />
          <span className="truncate">{candidate.academicLevel}</span>
        </div>
      </div>

      {/* Bar for Compatibility % */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-text-secondary">Ajuste de Perfil:</span>
          <span className="text-navy-blue font-mono">{candidate.compatibilityPercentage}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${candidate.compatibilityPercentage}%`,
              backgroundColor: candidate.compatibilityPercentage >= 90 ? "#749763" : candidate.compatibilityPercentage >= 75 ? "#D4AA45" : "#DC2626",
            }}
          />
        </div>
      </div>

      <hr className="border-border-color" />

      {/* Actions & Status Row */}
      <div className="flex justify-between items-center gap-2">
        <div className="scale-90 origin-left">
          <CurriculumStatusBadge status={candidate.status as any} />
        </div>

        <button
          onClick={handleViewDetails}
          className="text-xs font-extrabold text-navy-blue hover:text-[#23589b] flex items-center gap-1 group transition-colors"
        >
          Ver Ficha IA
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CandidateRanking } from "../types/ranking.types";
import { CandidateScoreBadge } from "./CandidateScoreBadge";

interface TopCandidatesPodiumProps {
  candidates: CandidateRanking[];
}

export const TopCandidatesPodium: React.FC<TopCandidatesPodiumProps> = ({ candidates }) => {
  const navigate = useNavigate();

  // Find 1st, 2nd, and 3rd place candidates
  const firstPlace = candidates.find((c) => c.position === "1° Lugar");
  const secondPlace = candidates.find((c) => c.position === "2° Lugar");
  const thirdPlace = candidates.find((c) => c.position === "3° Lugar");

  if (!firstPlace || !secondPlace || !thirdPlace) {
    return null;
  }

  const handleCardClick = (id: string) => {
    navigate(`/rankings/${id}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  // Render a podium spot
  const renderPodiumSpot = (
    candidate: CandidateRanking,
    positionName: "1st" | "2nd" | "3rd",
    heightClass: string,
    delay: number,
    medalColor: string,
    podiumBg: string,
    borderColor: string
  ) => {
    const isFirst = positionName === "1st";

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className="flex flex-col items-center flex-1 min-w-[240px] max-w-[320px]"
      >
        {/* Candidate Profile Info floating above the podium */}
        <div className="flex flex-col items-center text-center mb-4 w-full">
          {/* Avatar and Badge */}
          <div className="relative mb-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCardClick(candidate.id)}
              className="cursor-pointer"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-lg border-4 ${borderColor} ${
                  isFirst ? "w-24 h-24 text-3xl" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${
                    isFirst ? "#163B70" : "#7DAA74"
                  } 0%, #1e4b85 100%)`,
                }}
              >
                {getInitials(candidate.candidateName)}
              </div>
            </motion.div>
            {/* Crown or Trophy Medal */}
            <div className={`absolute -top-3 -right-2 p-1.5 rounded-full shadow-md text-white ${medalColor}`}>
              {isFirst ? <Trophy className="w-5 h-5" /> : <Award className="w-4 h-4" />}
            </div>
          </div>

          <h4
            onClick={() => handleCardClick(candidate.id)}
            className={`font-extrabold text-text-primary hover:text-navy-blue transition-colors cursor-pointer flex items-center gap-1 leading-tight ${
              isFirst ? "text-lg" : "text-base"
            }`}
          >
            {candidate.candidateName}
            <ExternalLink className="w-3.5 h-3.5 opacity-60 inline" />
          </h4>
          <p className="text-xs text-text-secondary font-semibold mt-0.5 line-clamp-1">
            {candidate.jobTitleAssociated}
          </p>

          <div className="mt-2 scale-90 origin-top">
            <CandidateScoreBadge score={candidate.scoreIA} />
          </div>
        </div>

        {/* The actual podium base */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => handleCardClick(candidate.id)}
          className={`w-full ${heightClass} ${podiumBg} rounded-t-2xl shadow-md border-t border-x ${borderColor} flex flex-col justify-between items-center p-4 cursor-pointer relative overflow-hidden`}
        >
          {/* Decorative background grid/lines */}
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          
          <div className="text-center z-10 flex flex-col items-center">
            <span className="text-3xl font-extrabold text-navy-blue opacity-30 mt-2 block">
              {candidate.position}
            </span>
            <span className="text-sm font-black text-navy-blue mt-1 uppercase tracking-wider block opacity-75">
              {candidate.compatibilityPercentage}% Ajuste
            </span>
          </div>

          <div className="w-full mt-4 z-10">
            <p className="text-[10px] uppercase font-bold text-text-secondary mb-1.5 tracking-wider text-center">
              Habilidades Destacadas
            </p>
            <div className="flex flex-wrap gap-1 justify-center">
              {candidate.skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="bg-white/80 border border-border-color text-[9px] font-bold px-1.5 py-0.5 rounded text-navy-blue shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="bg-light-bg rounded-2xl border border-border-color p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-black text-text-primary flex items-center gap-2">
          <Trophy className="w-5 h-5 text-golden-sand" /> Podio de Candidatos Elegibles - Top 3 Evaluados por IA
        </h3>
        <p className="text-sm text-text-secondary">
          Los perfiles más competentes e idóneos evaluados automáticamente por compatibilidad de currículos, competencias NLP y experiencia comprobada.
        </p>
      </div>

      {/* Podium grid with order rearranged so 2nd is left, 1st is center, 3rd is right */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-4 lg:gap-8 pt-10 min-h-[460px]">
        {/* 2nd Place */}
        {renderPodiumSpot(
          secondPlace,
          "2nd",
          "h-32 md:h-40",
          0.2,
          "bg-gray-400",
          "bg-gradient-to-b from-[#7DAA74]/15 to-[#7DAA74]/5",
          "border-[#7DAA74]/30"
        )}

        {/* 1st Place */}
        {renderPodiumSpot(
          firstPlace,
          "1st",
          "h-40 md:h-52",
          0.1,
          "bg-[#D4AA45]",
          "bg-gradient-to-b from-navy-blue/15 to-navy-blue/5",
          "border-navy-blue/30"
        )}

        {/* 3rd Place */}
        {renderPodiumSpot(
          thirdPlace,
          "3rd",
          "h-24 md:h-32",
          0.3,
          "bg-[#c5764b]",
          "bg-gradient-to-b from-[#D4AA45]/15 to-[#D4AA45]/5",
          "border-[#D4AA45]/30"
        )}
      </div>
    </div>
  );
};

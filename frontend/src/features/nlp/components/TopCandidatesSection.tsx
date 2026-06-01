import React from "react";
import { Trophy, User, Brain } from "lucide-react";
import type { RankingCandidate } from "../types/nlp.types";
import { getCompatibilityColor } from "../utils/compatibility.utils";
import { motion } from "framer-motion";

interface TopCandidatesSectionProps {
  candidates: RankingCandidate[];
  onSelectCandidate: (cvId: number) => void;
}

export const TopCandidatesSection: React.FC<TopCandidatesSectionProps> = ({
  candidates,
  onSelectCandidate,
}) => {
  // Sort to make sure first, second, and third are properly ordered
  const sorted = [...candidates]
    .sort((a, b) => b.compatibilidad - a.compatibilidad)
    .slice(0, 3);

  if (sorted.length === 0) return null;

  const podiumInfo = [
    {
      medal: "🥇",
      title: "Oro",
      badgeColor: "bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300",
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
      shadow: "shadow-amber-500/5 hover:shadow-amber-500/10",
      orderClass: "order-1 md:order-2 md:-translate-y-4 border-amber-400 dark:border-amber-500/50",
    },
    {
      medal: "🥈",
      title: "Plata",
      badgeColor: "bg-slate-100 border-slate-300 text-slate-800 dark:bg-slate-950/40 dark:border-slate-800 dark:text-slate-300",
      gradient: "from-slate-400/10 via-slate-400/5 to-transparent",
      shadow: "shadow-slate-400/5 hover:shadow-slate-400/10",
      orderClass: "order-2 md:order-1 border-slate-300 dark:border-slate-700/50",
    },
    {
      medal: "🥉",
      title: "Bronce",
      badgeColor: "bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-950/40 dark:border-orange-800 dark:text-orange-300",
      gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
      shadow: "shadow-orange-500/5 hover:shadow-orange-500/10",
      orderClass: "order-3 border-orange-300 dark:border-orange-900/50",
    },
  ];

  // Map candidates to their corresponding position (1st -> index 0, 2nd -> index 1, 3rd -> index 2)
  const podiumData = sorted.map((candidate, idx) => ({
    candidate,
    ...podiumInfo[idx],
  }));

  // Render order in mobile is 1, 2, 3, but in desktop we want 2, 1, 3 (Plata on left, Oro in center, Bronce on right)
  const desktopOrdered = [
    podiumData[1], // Plata
    podiumData[0], // Oro
    podiumData[2], // Bronce
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-4 select-none">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-amber-500 animate-bounce" />
        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
          Cuadro de Honor IA: Top 3 Candidatos
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        {desktopOrdered.map(({ candidate, medal, title, badgeColor, gradient, shadow, orderClass }) => {
          const compatColor = getCompatibilityColor(candidate.compatibilidad);
          return (
            <motion.div
              key={candidate.cv_id}
              onClick={() => onSelectCandidate(candidate.cv_id)}
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`cursor-pointer relative overflow-hidden bg-white dark:bg-slate-900 border rounded-2xl p-6 transition-all duration-300 shadow-lg ${shadow} ${orderClass}`}
            >
              {/* Decorative premium corner gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`} />

              {/* Medal Header */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-full text-3xs font-extrabold uppercase border flex items-center gap-1 ${badgeColor}`}>
                  <span>{medal}</span>
                  <span>{title}</span>
                </span>
                <span className="text-2xs font-extrabold uppercase text-slate-400">
                  Ranking ATS
                </span>
              </div>

              {/* Candidate Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase truncate">
                    {candidate.candidato}
                  </h4>
                  <p className="text-3xs text-slate-400 truncate mt-0.5">
                    {candidate.correo}
                  </p>
                </div>
              </div>

              {/* Compatibility score badge */}
              <div className="flex items-center justify-between mb-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 text-2xs font-bold text-slate-500 uppercase">
                  <Brain className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Compatibilidad</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-2xs font-extrabold ${compatColor}`}>
                  {candidate.compatibilidad}%
                </span>
              </div>

              {/* Dictamen Preview */}
              <div className="min-h-[44px]">
                <p className="text-3xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed line-clamp-2 italic">
                  "{candidate.resultado}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <span className="text-3xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1">
                  <span>Ver Dictamen Completo</span>
                  <span>→</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

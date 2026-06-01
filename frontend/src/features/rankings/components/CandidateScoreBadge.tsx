import React from "react";
import { cn } from "../../../lib/utils";
import { Sparkles, BrainCircuit, Award } from "lucide-react";

interface CandidateScoreBadgeProps {
  score: number;
  className?: string;
}

export const CandidateScoreBadge: React.FC<CandidateScoreBadgeProps> = ({ score, className }) => {
  const getScoreStyle = (val: number) => {
    if (val >= 95) {
      return {
        bg: "bg-[#749763]/10 border-[#749763]/30 text-[#749763]",
        icon: Sparkles,
        label: "AI Top Match",
      };
    }
    if (val >= 90) {
      return {
        bg: "bg-navy-blue/10 border-navy-blue/30 text-navy-blue",
        icon: BrainCircuit,
        label: "AI Alta Idoneidad",
      };
    }
    if (val >= 80) {
      return {
        bg: "bg-[#D4AA45]/10 border-[#D4AA45]/30 text-[#D4AA45]",
        icon: Award,
        label: "AI Recomendado",
      };
    }
    return {
      bg: "bg-gray-100 border-gray-300 text-text-secondary",
      icon: Award,
      label: "AI Apto",
    };
  };

  const { bg, icon: Icon, label } = getScoreStyle(score);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-1 text-sm font-bold border gap-1.5 shadow-sm select-none",
        bg,
        className
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="font-mono">{score} pts</span>
      <span className="text-[10px] uppercase font-black opacity-85 ml-0.5 tracking-wide hidden md:inline-block">
        {label}
      </span>
    </span>
  );
};

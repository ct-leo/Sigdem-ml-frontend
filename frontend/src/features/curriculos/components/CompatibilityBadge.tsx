import React from "react";
import { cn } from "../../../lib/utils";
import { Sparkles, AlertCircle, CheckCircle } from "lucide-react";

interface CompatibilityBadgeProps {
  score: number;
  className?: string;
}

export const CompatibilityBadge: React.FC<CompatibilityBadgeProps> = ({ score, className }) => {
  const getBadgeStyle = (val: number) => {
    if (val >= 90) {
      return {
        bg: "bg-[#749763]/10 border-[#749763]/20 text-[#749763]",
        icon: Sparkles,
        label: "Excelente Ajuste",
      };
    }
    if (val >= 70) {
      return {
        bg: "bg-[#D4AA45]/10 border-[#D4AA45]/20 text-golden-sand",
        icon: CheckCircle,
        label: "Buen Ajuste",
      };
    }
    return {
      bg: "bg-red-50 border-red-200 text-danger",
      icon: AlertCircle,
      label: "Ajuste Moderado",
    };
  };

  const { bg, icon: Icon, label } = getBadgeStyle(score);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold border gap-1 shadow-sm select-none",
        bg,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="font-mono">{score}%</span>
      <span className="text-[9.5px] uppercase font-black opacity-80 ml-0.5 tracking-wide hidden sm:inline-block">
        {label}
      </span>
    </span>
  );
};

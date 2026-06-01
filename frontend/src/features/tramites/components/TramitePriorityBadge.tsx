import React from "react";
import type { TramitePriority } from "../types/tramite.types";
import { TRAMITE_PRIORITY_COLORS, TRAMITE_PRIORITY_LABELS } from "../constants/tramitePriority";

interface Props {
  priority: TramitePriority;
}

export const TramitePriorityBadge: React.FC<Props> = ({ priority }) => {
  const colors = TRAMITE_PRIORITY_COLORS[priority] || { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" };
  const label = TRAMITE_PRIORITY_LABELS[priority] || priority;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}>
      {label}
    </span>
  );
};

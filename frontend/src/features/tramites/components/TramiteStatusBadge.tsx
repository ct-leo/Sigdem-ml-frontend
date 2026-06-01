import React from "react";
import type { TramiteStatus } from "../types/tramite.types";
import { TRAMITE_STATUS_COLORS, TRAMITE_STATUS_LABELS } from "../constants/tramiteStatus";

interface Props {
  status: TramiteStatus;
}

export const TramiteStatusBadge: React.FC<Props> = ({ status }) => {
  const colors = TRAMITE_STATUS_COLORS[status] || { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" };
  const label = TRAMITE_STATUS_LABELS[status] || status;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}>
      {label}
    </span>
  );
};

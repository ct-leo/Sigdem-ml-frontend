import React from "react";
import { Brain, Clock } from "lucide-react";
import type { CVProcessedStatus } from "../../cvs/types/cv.types";
import { getCVStatusConfig } from "../../cvs/constants/cvStatus";

interface CVNLPStatusBadgeProps {
  status: CVProcessedStatus;
  showIcon?: boolean;
}

export const CVNLPStatusBadge: React.FC<CVNLPStatusBadgeProps> = ({
  status,
  showIcon = true,
}) => {
  const config = getCVStatusConfig(status);
  const Icon = status === "SI" ? Brain : Clock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.badgeClass}`}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </span>
  );
};

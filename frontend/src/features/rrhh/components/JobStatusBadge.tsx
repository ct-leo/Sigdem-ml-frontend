import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { JobStatus } from "../types/job.types";
import { Play, Pause, XOctagon } from "lucide-react";
import { JOB_STATUS_LABELS } from "../constants/jobStatus";

interface JobStatusBadgeProps {
  status: JobStatus;
}

export const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status }) => {
  const config = {
    ABIERTA: {
      variant: "success" as const,
      icon: Play,
      label: JOB_STATUS_LABELS.ABIERTA,
    },
    PAUSADA: {
      variant: "warning" as const,
      icon: Pause,
      label: JOB_STATUS_LABELS.PAUSADA,
    },
    CERRADA: {
      variant: "danger" as const,
      icon: XOctagon,
      label: JOB_STATUS_LABELS.CERRADA,
    },
  };

  const { variant, icon: Icon, label } = config[status] || {
    variant: "default" as const,
    icon: Play,
    label: status === "ABIERTA" ? "Convocatoria Activa" : status === "PAUSADA" ? "Temporalmente Pausada" : "Proceso Cerrado",
  };

  return (
    <Badge variant={variant} className="gap-1.5 py-1 px-2.5 font-semibold whitespace-nowrap">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Badge>
  );
};

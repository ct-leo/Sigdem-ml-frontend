import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { JobStatus } from "../types/job.types";
import { Play, Pause, FileEdit, XOctagon, CheckCircle2 } from "lucide-react";

interface JobStatusBadgeProps {
  status: JobStatus;
}

export const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status }) => {
  const config = {
    Borrador: {
      variant: "default" as const,
      icon: FileEdit,
      label: "Borrador",
    },
    Activa: {
      variant: "success" as const,
      icon: Play,
      label: "Convocatoria Activa",
    },
    Pausada: {
      variant: "warning" as const,
      icon: Pause,
      label: "Pausada",
    },
    Cerrada: {
      variant: "danger" as const,
      icon: XOctagon,
      label: "Convocatoria Cerrada",
    },
    Finalizada: {
      variant: "info" as const,
      icon: CheckCircle2,
      label: "Proceso Finalizado",
    },
  };

  const { variant, icon: Icon, label } = config[status] || {
    variant: "default" as const,
    icon: FileEdit,
    label: status,
  };

  return (
    <Badge variant={variant} className="gap-1.5 py-1 px-2.5 font-semibold whitespace-nowrap">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Badge>
  );
};

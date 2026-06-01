import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { CandidateStatus } from "../types/curriculum.types";
import { Clock, Eye, CheckCircle2, UserCheck, XCircle } from "lucide-react";

interface CurriculumStatusBadgeProps {
  status: CandidateStatus;
}

export const CurriculumStatusBadge: React.FC<CurriculumStatusBadgeProps> = ({ status }) => {
  const config = {
    Pendiente: {
      variant: "default" as const,
      icon: Clock,
      label: "Pendiente",
    },
    "En Revisión": {
      variant: "info" as const,
      icon: Eye,
      label: "En Revisión",
    },
    Preseleccionado: {
      variant: "warning" as const,
      icon: UserCheck,
      label: "Preseleccionado",
    },
    Aprobado: {
      variant: "success" as const,
      icon: CheckCircle2,
      label: "Aprobado",
    },
    Descartado: {
      variant: "danger" as const,
      icon: XCircle,
      label: "Descartado",
    },
  };

  const { variant, icon: Icon, label } = config[status] || {
    variant: "default" as const,
    icon: Clock,
    label: status,
  };

  return (
    <Badge variant={variant} className="gap-1.5 py-1 px-2.5 font-semibold whitespace-nowrap">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Badge>
  );
};

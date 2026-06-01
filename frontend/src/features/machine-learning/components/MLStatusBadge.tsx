import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { MLModelStatus } from "../types/ml.types";
import { CheckCircle2, RotateCw, RefreshCw, AlertTriangle } from "lucide-react";

interface MLStatusBadgeProps {
  status: MLModelStatus;
}

export const MLStatusBadge: React.FC<MLStatusBadgeProps> = ({ status }) => {
  const config = {
    Activo: {
      variant: "success" as const,
      icon: CheckCircle2,
      label: "Modelo Activo",
      pulse: false,
    },
    Entrenando: {
      variant: "warning" as const,
      icon: RotateCw,
      label: "Entrenando",
      pulse: true,
    },
    Actualizando: {
      variant: "info" as const,
      icon: RefreshCw,
      label: "Actualizando",
      pulse: true,
    },
    Error: {
      variant: "danger" as const,
      icon: AlertTriangle,
      label: "Error de Sistema",
      pulse: false,
    },
  };

  const { variant, icon: Icon, label, pulse } = config[status] || {
    variant: "default" as const,
    icon: CheckCircle2,
    label: status,
    pulse: false,
  };

  return (
    <Badge variant={variant} className="gap-1.5 py-1 px-3 font-semibold whitespace-nowrap">
      <Icon className={`w-3.5 h-3.5 ${pulse ? "animate-spin" : ""}`} />
      {label}
    </Badge>
  );
};

import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { OCRStatus } from "../types/document.types";
import { CheckCircle2, Clock, PlayCircle, AlertCircle } from "lucide-react";

interface OCRStatusBadgeProps {
  status: OCRStatus;
}

export const OCRStatusBadge: React.FC<OCRStatusBadgeProps> = ({ status }) => {
  const config = {
    Procesado: {
      variant: "success" as const,
      icon: CheckCircle2,
      label: "OCR Procesado",
    },
    Pendiente: {
      variant: "warning" as const,
      icon: Clock,
      label: "OCR Pendiente",
    },
    "En Proceso": {
      variant: "info" as const,
      icon: PlayCircle,
      label: "OCR En Proceso",
    },
    Error: {
      variant: "danger" as const,
      icon: AlertCircle,
      label: "OCR Error",
    },
  };

  const { variant, icon: Icon, label } = config[status] || {
    variant: "default" as const,
    icon: Clock,
    label: status,
  };

  return (
    <Badge variant={variant} className="gap-1.5 py-1 px-2.5 font-medium whitespace-nowrap">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Badge>
  );
};

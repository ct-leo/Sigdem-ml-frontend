import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { OCRStatus } from "../types/document.types";
import { CheckCircle2, Clock } from "lucide-react";

interface OCRStatusBadgeProps {
  status: OCRStatus;
}

export const OCRStatusBadge: React.FC<OCRStatusBadgeProps> = ({ status }) => {
  const config = {
    SI: {
      variant: "success" as const,
      icon: CheckCircle2,
      label: "Procesado",
    },
    NO: {
      variant: "warning" as const,
      icon: Clock,
      label: "Pendiente",
    },
  };

  const { variant, icon: Icon, label } = config[status] || {
    variant: "default" as const,
    icon: Clock,
    label: status === "SI" ? "Procesado" : "Pendiente",
  };

  return (
    <Badge variant={variant} className="gap-1.5 py-1 px-2.5 font-medium whitespace-nowrap">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Badge>
  );
};

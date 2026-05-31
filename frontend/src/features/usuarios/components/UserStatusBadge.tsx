import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { UserStatus } from "../types/user.types";
import { CheckCircle2, XCircle, AlertTriangle, Lock } from "lucide-react";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  const config = {
    Activo: {
      variant: "success" as const,
      icon: CheckCircle2,
      label: "Activo",
    },
    Inactivo: {
      variant: "default" as const,
      icon: XCircle,
      label: "Inactivo",
    },
    Suspendido: {
      variant: "warning" as const,
      icon: AlertTriangle,
      label: "Suspendido",
    },
    Bloqueado: {
      variant: "danger" as const,
      icon: Lock,
      label: "Bloqueado",
    },
  };

  const { variant, icon: Icon, label } = config[status] || {
    variant: "default" as const,
    icon: XCircle,
    label: status,
  };

  return (
    <Badge variant={variant} className="gap-1 py-0.5 px-2.5 font-bold text-[10px] uppercase tracking-wide whitespace-nowrap">
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  );
};

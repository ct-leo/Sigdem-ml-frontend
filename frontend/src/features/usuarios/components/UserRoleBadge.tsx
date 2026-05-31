import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { UserRole } from "../types/user.types";
import { ShieldAlert, ShieldCheck, ShieldAlert as UserIcon, Award, UserCheck } from "lucide-react";

interface UserRoleBadgeProps {
  role: UserRole;
}

export const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  const config = {
    Administrador: {
      variant: "info" as const,
      icon: ShieldAlert,
      label: "Administrador",
    },
    Supervisor: {
      variant: "warning" as const,
      icon: ShieldCheck,
      label: "Supervisor",
    },
    Analista: {
      variant: "success" as const,
      icon: Award,
      label: "Analista",
    },
    Operador: {
      variant: "default" as const,
      icon: UserIcon,
      label: "Operador",
    },
    RRHH: {
      variant: "success" as const,
      icon: UserCheck,
      label: "RRHH",
    },
  };

  const { variant, icon: Icon, label } = config[role] || {
    variant: "default" as const,
    icon: UserIcon,
    label: role,
  };

  return (
    <Badge variant={variant} className="gap-1 py-0.5 px-2.5 font-bold text-[10px] uppercase tracking-wide whitespace-nowrap">
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  );
};

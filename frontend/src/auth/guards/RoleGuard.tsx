import React from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../hooks/useRole";
import type { UserRole } from "../permissions/roles";
import { UnauthorizedPage } from "../../features/auth/pages/UnauthorizedPage";
import { useNotificationStore } from "../../stores/notifications/notificationStore";
import { toast } from "sonner";

interface RoleGuardProps {
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: "unauthorized" | "redirect";
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  roles,
  children,
  fallback = "unauthorized",
}) => {
  const { role } = useRole();
  const addNotification = useNotificationStore((s) => s.addNotification);

  const hasAccess = role && roles.includes(role);

  React.useEffect(() => {
    if (role && !hasAccess) {
      // Log access violation in Sonner & Notification Audit Log
      const msg = `Intento de acceso no autorizado al módulo protegido por el usuario con rol de: ${role}.`;
      toast.error("Acceso Denegado: Permisos Insuficientes", {
        description: msg,
      });

      addNotification(
        "Acceso Denegado (Seguridad)",
        msg,
        "warning",
        "Sistema",
        "/dashboard"
      );
    }
  }, [role, hasAccess, addNotification]);

  if (!hasAccess) {
    if (fallback === "redirect") {
      return <Navigate to="/dashboard" replace />;
    }
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
};
export default RoleGuard;

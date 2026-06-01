import React from "react";
import { useUser } from "../stores/hooks/useUser";
import { ShieldAlert } from "lucide-react";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  allowedRoles, 
  children, 
  fallback 
}) => {
  const { role } = useUser();

  const isAllowed = role && allowedRoles.includes(role);

  if (!isAllowed) {
    if (fallback !== undefined) return <>{fallback}</>;

    return (
      <div className="bg-white border border-border-color shadow-sm rounded-xl p-8 max-w-lg mx-auto text-center my-12 select-none">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-danger flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-black text-text-primary uppercase tracking-wider mb-2">Acceso Restringido</h3>
        <p className="text-xs text-text-secondary leading-relaxed font-semibold">
          Tu rol de acceso actual ({role || "Ninguno"}) no posee privilegios especiales autorizados para visualizar o gestionar este centro operacional de inteligencia artificial.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

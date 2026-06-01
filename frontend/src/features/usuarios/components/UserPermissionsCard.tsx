import React from "react";
import type { LegacyUser } from "../types/user.types";
import { Card, CardContent } from "../../../components/ui/Card";
import { ShieldCheck, Key } from "lucide-react";
import { useUpdateUserPermissions } from "../hooks/useUpdateUser";
import { alerts } from "../../../utils/sweetalert";

interface UserPermissionsCardProps {
  user: LegacyUser;
}

export const UserPermissionsCard: React.FC<UserPermissionsCardProps> = ({ user }) => {
  const updatePermissionsMutation = useUpdateUserPermissions();

  const handleTogglePermission = async (permId: string) => {
    const targetPerm = user.permissions.find(p => p.id === permId);
    if (!targetPerm) return;

    const actionText = targetPerm.assigned ? "quitar" : "conceder";
    const result = await alerts.confirmAction(
      "Modificar Permiso",
      `¿Está seguro de ${actionText} el permiso "${targetPerm.name}" para este usuario?`,
      "Confirmar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    const updatedPermissions = user.permissions.map((p) => {
      if (p.id === permId) {
        return { ...p, assigned: !p.assigned };
      }
      return p;
    });

    try {
      await updatePermissionsMutation.mutateAsync({
        id: user.id,
        permissions: updatedPermissions,
      });
      await alerts.success("Permisos Actualizados", "Los privilegios RBAC del usuario se han modificado.");
    } catch {
      alerts.error("Error", "Error al actualizar los permisos del usuario");
    }
  };

  return (
    <Card className="border border-border-color shadow-sm h-full select-none">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b border-border-color pb-3">
          <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5 text-navy-blue" />
            Privilegios & Control de Acceso (RBAC)
          </h3>
          <p className="text-xs text-text-secondary">
            Configuración detallada de permisos especiales asociados al rol operativo.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {user.permissions.map((perm) => (
            <div key={perm.id} className="flex justify-between items-start gap-4 p-3 bg-light-bg rounded-lg border border-border-color/60 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-navy-blue shrink-0" />
                  {perm.name}
                  <span className="text-[9px] font-mono bg-gray-200 text-text-secondary px-1 py-0.2 rounded font-black">
                    {perm.code}
                  </span>
                </span>
                <span className="text-[10px] text-text-secondary leading-normal font-semibold">
                  {perm.description}
                </span>
              </div>

              {/* Standard custom toggle switch */}
              <button
                onClick={() => handleTogglePermission(perm.id)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  perm.assigned ? "bg-[#749763]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    perm.assigned ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

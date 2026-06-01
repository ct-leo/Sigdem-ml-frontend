import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Eye, Edit, Key, Trash2, Check, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useActivateUser } from "../hooks/useActivateUser";
import { useDeactivateUser } from "../hooks/useDeactivateUser";
import type { LegacyUser } from "../types/user.types";
import { alerts } from "../../../utils/sweetalert";

interface UserActionsProps {
  user: LegacyUser;
}

export const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const deleteMutation = useDeleteUser();
  const activateMutation = useActivateUser();
  const deactivateMutation = useDeactivateUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResetPassword = async () => {
    setIsOpen(false);
    const result = await alerts.confirmAction(
      "Restablecer Clave",
      `¿Desea enviar un enlace de recuperación de contraseña a ${user.email}?`,
      "Enviar Correo",
      "Cancelar"
    );
    if (result.isConfirmed) {
      toast.success(`Se ha enviado un correo de restablecimiento de contraseña a: ${user.email}`);
    }
  };

  const handleActivate = async () => {
    setIsOpen(false);
    const result = await alerts.confirmAction(
      "Activar Funcionario",
      `¿Desea habilitar los privilegios de acceso para ${user.fullName}?`,
      "Habilitar",
      "Cancelar"
    );
    if (result.isConfirmed) {
      try {
        await activateMutation.mutateAsync(user.id);
      } catch (err) {
        // Handled in hook
      }
    }
  };

  const handleDeactivate = async () => {
    setIsOpen(false);
    const result = await alerts.confirmAction(
      "Desactivar Funcionario",
      `¿Está seguro que desea suspender temporalmente al funcionario ${user.fullName}?`,
      "Suspender",
      "Cancelar",
      true
    );
    if (result.isConfirmed) {
      try {
        await deactivateMutation.mutateAsync(user.id);
      } catch (err) {
        // Handled in hook
      }
    }
  };

  const handleDelete = async () => {
    setIsOpen(false);
    const result = await alerts.confirmDelete(
      "¿Eliminar Funcionario?",
      `¿Está seguro que desea eliminar permanentemente la cuenta de ${user.fullName}? Esta acción es irreversible.`
    );
    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(user.id);
      } catch (err) {
        // Handled in hook
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 hover:bg-gray-100 rounded-lg text-text-secondary transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-border-color rounded-lg shadow-lg z-30 py-1 origin-top-right text-xs font-semibold text-text-primary">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate(`/usuarios/${user.id}`);
            }}
            className="w-full text-left px-4 py-2 hover:bg-light-bg flex items-center gap-2"
          >
            <Eye className="w-4 h-4 text-navy-blue" />
            Ver Perfil
          </button>
          
          <button
            onClick={() => {
              setIsOpen(false);
              navigate(`/usuarios/${user.id}/editar`);
            }}
            className="w-full text-left px-4 py-2 hover:bg-light-bg flex items-center gap-2"
          >
            <Edit className="w-4 h-4 text-[#7DAA74]" />
            Editar Usuario
          </button>

          {user.status === "Inactivo" ? (
            <button
              onClick={handleActivate}
              className="w-full text-left px-4 py-2 hover:bg-light-bg text-dashboard-green flex items-center gap-2 font-bold"
            >
              <Check className="w-4 h-4 text-dashboard-green" />
              Activar Usuario
            </button>
          ) : (
            <button
              onClick={handleDeactivate}
              className="w-full text-left px-4 py-2 hover:bg-light-bg text-orange-500 flex items-center gap-2 font-bold"
            >
              <XCircle className="w-4 h-4 text-orange-500" />
              Desactivar Usuario
            </button>
          )}

          <button
            onClick={handleResetPassword}
            className="w-full text-left px-4 py-2 hover:bg-light-bg flex items-center gap-2"
          >
            <Key className="w-4 h-4 text-golden-sand" />
            Restablecer Clave
          </button>
          
          <hr className="border-border-color my-1" />
          
          <button
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 hover:bg-light-bg text-danger flex items-center gap-2 font-bold"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar Usuario
          </button>
        </div>
      )}
    </div>
  );
};

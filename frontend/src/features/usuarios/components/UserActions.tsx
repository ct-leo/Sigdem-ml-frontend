import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Eye, Edit, Key, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteUser } from "../hooks/useDeleteUser";
import type { User } from "../types/user.types";

interface UserActionsProps {
  user: User;
}

export const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const deleteMutation = useDeleteUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResetPassword = () => {
    setIsOpen(false);
    toast.success(`Se ha enviado un correo de restablecimiento de contraseña a: ${user.email}`);
  };

  const handleDelete = async () => {
    setIsOpen(false);
    if (window.confirm(`¿Está seguro que desea eliminar permanentemente al usuario ${user.fullName}?`)) {
      try {
        await deleteMutation.mutateAsync(user.id);
        toast.success(`Usuario ${user.fullName} eliminado exitosamente`);
      } catch (err: any) {
        toast.error(err.message || "Error al eliminar el usuario");
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

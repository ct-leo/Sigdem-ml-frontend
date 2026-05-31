import React from "react";
import type { User } from "../types/user.types";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserActions } from "./UserActions";
import { Clock, Calendar, Mail } from "lucide-react";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, isLoading }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-border-color rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 text-center text-xs font-semibold text-text-secondary">
          Cargando usuarios y roles...
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white border border-border-color rounded-xl overflow-hidden shadow-sm p-12 text-center">
        <p className="text-sm font-semibold text-text-secondary">No se encontraron usuarios con los criterios de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-color rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-semibold">
          <thead>
            <tr className="bg-light-bg text-text-secondary border-b border-border-color uppercase tracking-wider text-[10px]">
              <th className="px-6 py-4 font-black">Usuario</th>
              <th className="px-6 py-4 font-black">Área / Cargo</th>
              <th className="px-6 py-4 font-black">Rol</th>
              <th className="px-6 py-4 font-black">Estado</th>
              <th className="px-6 py-4 font-black">Último Acceso</th>
              <th className="px-6 py-4 font-black">Fecha Registro</th>
              <th className="px-6 py-4 font-black text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color text-text-primary">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-light-bg/40 transition-colors">
                {/* Nombre & Correo */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-navy-blue text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {getInitials(user.fullName)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-text-primary text-sm">{user.fullName}</span>
                      <span className="text-[10px] text-text-secondary flex items-center gap-1 font-semibold">
                        <Mail className="w-3.5 h-3.5 text-text-secondary" /> {user.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Área & Cargo */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-navy-blue">{user.position}</span>
                    <span className="text-[10px] text-text-secondary font-bold">{user.area}</span>
                  </div>
                </td>

                {/* Rol Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <UserRoleBadge role={user.role} />
                </td>

                {/* Estado Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <UserStatusBadge status={user.status} />
                </td>

                {/* Último Acceso */}
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{new Date(user.lastAccess).toLocaleDateString()} {new Date(user.lastAccess).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </td>

                {/* Fecha Registro */}
                <td className="px-6 py-4 whitespace-nowrap text-text-secondary font-mono">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{new Date(user.registrationDate).toLocaleDateString()}</span>
                  </div>
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <UserActions user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React from "react";
import { RotateCcw } from "lucide-react";
import type { UserRole, UserStatus } from "../types/user.types";

export interface UsersFiltersState {
  role?: UserRole | "";
  status?: UserStatus | "";
}

interface UsersFiltersProps {
  filters: UsersFiltersState;
  onFilterChange: (filters: UsersFiltersState) => void;
}

export const UsersFilters: React.FC<UsersFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: keyof UsersFiltersState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      role: "",
      status: "",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
      {/* Role Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Rol:</span>
        <select
          value={filters.role || ""}
          onChange={(e) => handleChange("role", e.target.value)}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="">Todos</option>
          <option value="Administrador">Administrador</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Analista">Analista</option>
          <option value="Operador">Operador</option>
          <option value="RRHH">RRHH</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Estado:</span>
        <select
          value={filters.status || ""}
          onChange={(e) => handleChange("status", e.target.value)}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="">Todos</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Suspendido">Suspendido</option>
          <option value="Bloqueado">Bloqueado</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        title="Restablecer filtros"
        className="p-2 border border-border-color hover:bg-gray-100 hover:text-navy-blue text-text-secondary rounded-lg transition-colors flex items-center justify-center"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};

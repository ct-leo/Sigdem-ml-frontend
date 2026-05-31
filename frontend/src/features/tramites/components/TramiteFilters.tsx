import React from "react";
import { Filter, X } from "lucide-react";
import type { TramiteStatus, TramitePriority } from "../types/tramite.types";

interface FiltersState {
  status?: TramiteStatus | "";
  priority?: TramitePriority | "";
}

interface Props {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

export const TramiteFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  const hasActiveFilters = filters.status || filters.priority;

  const clearFilters = () => {
    onFilterChange({ status: "", priority: "" });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center text-sm font-medium text-text-secondary mr-2">
        <Filter className="w-4 h-4 mr-2" />
        Filtros:
      </div>

      <select
        value={filters.status || ""}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as TramiteStatus })}
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors"
      >
        <option value="">Todos los Estados</option>
        <option value="Registrado">Registrado</option>
        <option value="En Revisión">En Revisión</option>
        <option value="Observado">Observado</option>
        <option value="Aprobado">Aprobado</option>
        <option value="Rechazado">Rechazado</option>
      </select>

      <select
        value={filters.priority || ""}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as TramitePriority })}
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors"
      >
        <option value="">Todas las Prioridades</option>
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
        <option value="Crítica">Crítica</option>
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-text-secondary hover:text-danger flex items-center transition-colors"
        >
          <X className="w-4 h-4 mr-1" />
          Limpiar
        </button>
      )}
    </div>
  );
};

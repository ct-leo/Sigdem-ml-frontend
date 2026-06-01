import React from "react";
import { Filter, X } from "lucide-react";
import type { TramiteStatus, TramitePriority } from "../types/tramite.types";

interface FiltersState {
  status?: TramiteStatus | "";
  priority?: TramitePriority | "";
  area?: string;
}

interface Props {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

export const TramiteFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  const hasActiveFilters = filters.status || filters.priority || filters.area;

  const clearFilters = () => {
    onFilterChange({ status: "", priority: "", area: "" });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center text-sm font-medium text-text-secondary mr-2">
        <Filter className="w-4 h-4 mr-2" />
        Filtros:
      </div>

      {/* Estado */}
      <select
        value={filters.status || ""}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as TramiteStatus })}
        className="bg-white border border-border-color text-xs rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors font-semibold text-text-primary"
      >
        <option value="">Todos los Estados</option>
        <option value="REGISTRADO">Registrado</option>
        <option value="EN_REVISION">En Revisión</option>
        <option value="OBSERVADO">Observado</option>
        <option value="APROBADO">Aprobado</option>
        <option value="RECHAZADO">Rechazado</option>
        <option value="FINALIZADO">Finalizado</option>
      </select>

      {/* Prioridad */}
      <select
        value={filters.priority || ""}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as TramitePriority })}
        className="bg-white border border-border-color text-xs rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors font-semibold text-text-primary"
      >
        <option value="">Todas las Prioridades</option>
        <option value="BAJA">Baja</option>
        <option value="MEDIA">Media</option>
        <option value="ALTA">Alta</option>
        <option value="CRITICA">Crítica</option>
      </select>

      {/* Área Municipal */}
      <select
        value={filters.area || ""}
        onChange={(e) => onFilterChange({ ...filters, area: e.target.value })}
        className="bg-white border border-border-color text-xs rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors font-semibold text-text-primary"
      >
        <option value="">Todas las Áreas</option>
        <option value="Desarrollo Económico">Desarrollo Económico</option>
        <option value="Obras Privadas">Obras Privadas</option>
        <option value="Planeamiento Urbano">Planeamiento Urbano</option>
        <option value="Seguridad Ciudadana">Seguridad Ciudadana</option>
        <option value="Mesa de Partes">Mesa de Partes</option>
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-xs text-text-secondary hover:text-danger flex items-center transition-colors font-bold"
        >
          <X className="w-4 h-4 mr-1" />
          Limpiar
        </button>
      )}
    </div>
  );
};

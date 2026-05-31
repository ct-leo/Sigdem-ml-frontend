import React from "react";
import { Filter, X } from "lucide-react";
import type { JobArea, JobStatus } from "../types/job.types";

export interface JobsFiltersState {
  area?: JobArea | "";
  status?: JobStatus | "";
}

interface JobsFiltersProps {
  filters: JobsFiltersState;
  onFilterChange: (filters: JobsFiltersState) => void;
}

export const JobsFilters: React.FC<JobsFiltersProps> = ({ filters, onFilterChange }) => {
  const hasActiveFilters = filters.area || filters.status;

  const clearFilters = () => {
    onFilterChange({ area: "", status: "" });
  };

  const areas: JobArea[] = [
    "Recursos Humanos",
    "Tesorería",
    "Administración",
    "Tecnologías de Información",
    "Obras",
    "Defensa Civil",
    "Fiscalización",
    "Secretaría General",
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center text-sm font-medium text-text-secondary mr-2">
        <Filter className="w-4 h-4 mr-2" />
        Filtros:
      </div>

      <select
        value={filters.area || ""}
        onChange={(e) => onFilterChange({ ...filters, area: e.target.value as JobArea })}
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">Áreas Responsables (Todas)</option>
        {areas.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <select
        value={filters.status || ""}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as JobStatus })}
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">Estados Convocatoria (Todos)</option>
        <option value="Borrador">Borrador</option>
        <option value="Activa">Activa</option>
        <option value="Pausada">Pausada</option>
        <option value="Cerrada">Cerrada</option>
        <option value="Finalizada">Finalizada</option>
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-text-secondary hover:text-danger flex items-center transition-colors font-medium ml-1"
        >
          <X className="w-4 h-4 mr-1" />
          Limpiar
        </button>
      )}
    </div>
  );
};

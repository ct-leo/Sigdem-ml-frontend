import React from "react";
import { Filter, X } from "lucide-react";
import type { CandidateStatus } from "../types/curriculum.types";

export interface CurriculumsFiltersState {
  status?: CandidateStatus | "";
  codeAssociated?: string;
  academicLevel?: string;
  compatibilityLevel?: "Excellent" | "Good" | "Moderate" | "";
  experienceYears?: number | "";
}

interface CurriculumsFiltersProps {
  filters: CurriculumsFiltersState;
  onFilterChange: (filters: CurriculumsFiltersState) => void;
  convocatoriasCodes: string[];
}

export const CurriculumsFilters: React.FC<CurriculumsFiltersProps> = ({
  filters,
  onFilterChange,
  convocatoriasCodes,
}) => {
  const hasActiveFilters =
    filters.status ||
    filters.codeAssociated ||
    filters.academicLevel ||
    filters.compatibilityLevel ||
    filters.experienceYears;

  const clearFilters = () => {
    onFilterChange({
      status: "",
      codeAssociated: "",
      academicLevel: "",
      compatibilityLevel: "",
      experienceYears: "",
    });
  };

  const academicLevels = [
    "Técnico Egresado",
    "Técnico Titulado",
    "Bachiller Universitario",
    "Titulado Universitario",
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center select-none">
      <div className="flex items-center text-sm font-medium text-text-secondary mr-2">
        <Filter className="w-4 h-4 mr-2" />
        Filtros ATS:
      </div>

      <select
        value={filters.status || ""}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as CandidateStatus })}
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">Estados (Todos)</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En Revisión">En Revisión</option>
        <option value="Preseleccionado">Preseleccionado</option>
        <option value="Aprobado">Aprobado</option>
        <option value="Descartado">Descartado</option>
      </select>

      <select
        value={filters.codeAssociated || ""}
        onChange={(e) => onFilterChange({ ...filters, codeAssociated: e.target.value })}
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">Convocatorias (Todas)</option>
        {convocatoriasCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>

      <select
        value={filters.academicLevel || ""}
        onChange={(e) => onFilterChange({ ...filters, academicLevel: e.target.value })}
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer text-ellipsis max-w-[170px]"
      >
        <option value="">Formación (Todas)</option>
        {academicLevels.map((lvl) => (
          <option key={lvl} value={lvl}>
            {lvl}
          </option>
        ))}
      </select>

      <select
        value={filters.compatibilityLevel || ""}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            compatibilityLevel: e.target.value as "Excellent" | "Good" | "Moderate" | "",
          })
        }
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">Ajuste NLP (Todos)</option>
        <option value="Excellent">Excelente (&gt;=90%)</option>
        <option value="Good">Bueno (&gt;=70%)</option>
        <option value="Moderate">Moderado (&lt;70%)</option>
      </select>

      <select
        value={filters.experienceYears || ""}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            experienceYears: e.target.value ? Number(e.target.value) : "",
          })
        }
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">Experiencia (Todos)</option>
        <option value="1">Mínimo 1 año</option>
        <option value="3">Mínimo 3 años</option>
        <option value="5">Mínimo 5 años</option>
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

import React from "react";
import { RotateCcw } from "lucide-react";
import type { CandidateRanking } from "../types/ranking.types";

export interface RankingFiltersState {
  status?: CandidateRanking["status"] | "";
  position?: CandidateRanking["position"] | "";
  minScore?: number | "";
  codeAssociated?: string | "";
}

interface RankingFiltersProps {
  filters: RankingFiltersState;
  onFilterChange: (filters: RankingFiltersState) => void;
  convocatoriasCodes: string[];
}

export const RankingFilters: React.FC<RankingFiltersProps> = ({
  filters,
  onFilterChange,
  convocatoriasCodes,
}) => {
  const handleChange = (key: keyof RankingFiltersState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      status: "",
      position: "",
      minScore: "",
      codeAssociated: "",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
      {/* Code Associated Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Convocatoria:</span>
        <select
          value={filters.codeAssociated || ""}
          onChange={(e) => handleChange("codeAssociated", e.target.value)}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="">Todas</option>
          {convocatoriasCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {/* Position/Lugar Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Rango/Lugar:</span>
        <select
          value={filters.position || ""}
          onChange={(e) => handleChange("position", e.target.value)}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="">Todos</option>
          <option value="1° Lugar">1° Lugar</option>
          <option value="2° Lugar">2° Lugar</option>
          <option value="3° Lugar">3° Lugar</option>
          <option value="Finalista">Finalista</option>
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
          <option value="Preseleccionado">Preseleccionado</option>
          <option value="Aprobado">Aprobado</option>
          <option value="En Revisión">En Revisión</option>
          <option value="Descartado">Descartado</option>
        </select>
      </div>

      {/* Minimum Score IA Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Min Score IA:</span>
        <select
          value={filters.minScore || ""}
          onChange={(e) => handleChange("minScore", e.target.value ? Number(e.target.value) : "")}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="">Cualquiera</option>
          <option value="95">95+ pts (AI Top)</option>
          <option value="90">90+ pts (AI Alta)</option>
          <option value="85">85+ pts (AI Recomendado)</option>
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

import React from "react";
import { RotateCcw } from "lucide-react";

export interface ReportsFiltersState {
  area?: string;
  timeRange?: string;
}

interface ReportsFiltersProps {
  filters: ReportsFiltersState;
  onFilterChange: (filters: ReportsFiltersState) => void;
}

const AREAS = [
  "Administración",
  "Recursos Humanos",
  "Tecnologías",
  "Obras",
  "Mesa de Partes",
  "Fiscalización"
];

export const ReportsFilters: React.FC<ReportsFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: keyof ReportsFiltersState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      area: "",
      timeRange: "",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
      {/* Area Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Área Municipal:</span>
        <select
          value={filters.area || ""}
          onChange={(e) => handleChange("area", e.target.value)}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="">Todas las Áreas</option>
          {AREAS.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Time Range Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Rango Temporal:</span>
        <select
          value={filters.timeRange || ""}
          onChange={(e) => handleChange("timeRange", e.target.value)}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="">Todo el Periodo</option>
          <option value="today">Hoy</option>
          <option value="week">Esta Semana</option>
          <option value="month">Este Mes</option>
          <option value="year">Este Año</option>
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

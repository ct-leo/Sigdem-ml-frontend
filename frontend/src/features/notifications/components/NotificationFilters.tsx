import React from "react";
import { RotateCcw } from "lucide-react";
import type { NotificationCategory } from "../../../stores/notifications/notification.types";

export interface NotificationFiltersState {
  readStatus?: "all" | "unread" | "read";
  category?: NotificationCategory | "";
}

interface NotificationFiltersProps {
  filters: NotificationFiltersState;
  onFilterChange: (filters: NotificationFiltersState) => void;
}

const CATEGORIES: NotificationCategory[] = [
  "Trámites",
  "Documentos",
  "RRHH",
  "IA",
  "Sistema"
];

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleChange = (key: keyof NotificationFiltersState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      readStatus: "all",
      category: "",
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end select-none">
      {/* Read status filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Estado:</span>
        <select
          value={filters.readStatus || "all"}
          onChange={(e) => handleChange("readStatus", e.target.value)}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="all">Todas</option>
          <option value="unread">No Leídas</option>
          <option value="read">Leídas</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-text-secondary whitespace-nowrap">Módulo:</span>
        <select
          value={filters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className="border border-border-color rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-primary bg-white focus:outline-none focus:ring-1 focus:ring-navy-blue"
        >
          <option value="">Todos los Módulos</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
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

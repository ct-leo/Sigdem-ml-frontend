import React from "react";
import { Filter, X } from "lucide-react";
import type { OCRStatus } from "../types/document.types";
import { useTramites } from "../../tramites/hooks/useTramites";

export interface DocumentsFiltersState {
  tipo_archivo?: string;
  ocr_procesado?: OCRStatus | "";
  tramite_id?: number | "";
}

interface DocumentsFiltersProps {
  filters: DocumentsFiltersState;
  onFilterChange: (filters: DocumentsFiltersState) => void;
}

export const DocumentsFilters: React.FC<DocumentsFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const { data: tramites } = useTramites();
  const hasActiveFilters = filters.tipo_archivo || filters.ocr_procesado || filters.tramite_id;

  const clearFilters = () => {
    onFilterChange({ tipo_archivo: "", ocr_procesado: "", tramite_id: "" });
  };

  const fileTypes = ["pdf", "docx", "doc", "png", "jpg", "jpeg"];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center text-sm font-medium text-text-secondary mr-2">
        <Filter className="w-4 h-4 mr-2" />
        Filtros:
      </div>

      {/* Formatos select */}
      <select
        value={filters.tipo_archivo || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, tipo_archivo: e.target.value })
        }
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer text-xs font-semibold text-text-primary"
      >
        <option value="">Formato (Todos)</option>
        {fileTypes.map(ft => (
          <option key={ft} value={ft}>{ft.toUpperCase()}</option>
        ))}
      </select>

      {/* OCR Select */}
      <select
        value={filters.ocr_procesado || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, ocr_procesado: e.target.value as OCRStatus })
        }
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer text-xs font-semibold text-text-primary"
      >
        <option value="">OCR (Todos)</option>
        <option value="SI">Procesado</option>
        <option value="NO">Pendiente</option>
      </select>

      {/* Tramite Dropdown Select */}
      <select
        value={filters.tramite_id || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, tramite_id: e.target.value ? Number(e.target.value) : "" })
        }
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer text-xs font-semibold text-text-primary max-w-[200px] truncate"
      >
        <option value="">Trámite (Todos)</option>
        {tramites?.map((t) => (
          <option key={t.id} value={t.id}>
            [{t.codigo}] {t.tipo_tramite}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-xs text-text-secondary hover:text-danger flex items-center transition-colors font-bold ml-1 uppercase tracking-wider"
        >
          <X className="w-4 h-4 mr-1" />
          Limpiar
        </button>
      )}
    </div>
  );
};

import React from "react";
import { Filter, X } from "lucide-react";
import type { DocumentType, OCRStatus } from "../types/document.types";

export interface DocumentsFiltersState {
  type?: DocumentType | "";
  statusOcr?: OCRStatus | "";
  responsibleArea?: string;
}

interface DocumentsFiltersProps {
  filters: DocumentsFiltersState;
  onFilterChange: (filters: DocumentsFiltersState) => void;
}

export const DocumentsFilters: React.FC<DocumentsFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const hasActiveFilters = filters.type || filters.statusOcr || filters.responsibleArea;

  const clearFilters = () => {
    onFilterChange({ type: "", statusOcr: "", responsibleArea: "" });
  };

  const areas = [
    "Desarrollo Económico",
    "Desarrollo Urbano",
    "Seguridad Ciudadana",
    "Gestión del Riesgo",
    "Administración Tributaria",
    "Servicios a la Ciudad",
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center text-sm font-medium text-text-secondary mr-2">
        <Filter className="w-4 h-4 mr-2" />
        Filtros:
      </div>

      <select
        value={filters.type || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, type: e.target.value as DocumentType })
        }
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">Formatos (Todos)</option>
        <option value="PDF">PDF</option>
        <option value="DOCX">DOCX</option>
        <option value="PNG">PNG</option>
        <option value="JPG">JPG</option>
        <option value="XLSX">XLSX</option>
      </select>

      <select
        value={filters.statusOcr || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, statusOcr: e.target.value as OCRStatus })
        }
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">OCR (Todos)</option>
        <option value="Procesado">Procesado</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En Proceso">En Proceso</option>
        <option value="Error">Error</option>
      </select>

      <select
        value={filters.responsibleArea || ""}
        onChange={(e) =>
          onFilterChange({ ...filters, responsibleArea: e.target.value })
        }
        className="bg-white border border-border-color text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-colors cursor-pointer"
      >
        <option value="">Áreas (Todas)</option>
        {areas.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
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

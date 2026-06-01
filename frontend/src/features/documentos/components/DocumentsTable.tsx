import React, { useState, useMemo } from "react";
import type { Document } from "../types/document.types";
import { OCRStatusBadge } from "./OCRStatusBadge";
import { DocumentActions } from "./DocumentActions";
import { DocumentPreview } from "./DocumentPreview";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Eye } from "lucide-react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface DocumentsTableProps {
  documents: Document[];
  isLoading: boolean;
}

type SortField = "nombre_original" | "fecha_subida" | "id";
type SortOrder = "asc" | "desc";

export const DocumentsTable: React.FC<DocumentsTableProps> = ({
  documents,
  isLoading,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<SortField>("fecha_subida");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedDocuments = useMemo(() => {
    return [...documents].sort((a, b) => {
      let comparison = 0;
      if (sortField === "nombre_original") {
        comparison = a.nombre_original.localeCompare(b.nombre_original);
      } else if (sortField === "fecha_subida") {
        comparison = dayjs(a.fecha_subida).isAfter(dayjs(b.fecha_subida)) ? 1 : -1;
      } else if (sortField === "id") {
        comparison = a.id - b.id;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [documents, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage);
  const paginatedDocuments = useMemo(() => {
    return sortedDocuments.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedDocuments, currentPage, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm p-8 flex flex-col gap-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-32 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm">
        <EmptyState
          title="No se encontraron documentos"
          description="Intente modificar los términos de búsqueda o los filtros."
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-border-color shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/80 text-text-secondary font-medium border-b border-border-color select-none">
            <tr>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort("nombre_original")}
                  className="flex items-center cursor-pointer hover:text-navy-blue transition-colors font-medium text-left uppercase text-xs tracking-wider"
                >
                  Nombre <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </th>
              <th className="px-6 py-4 uppercase text-xs tracking-wider">Tipo</th>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort("fecha_subida")}
                  className="flex items-center cursor-pointer hover:text-navy-blue transition-colors font-medium text-left uppercase text-xs tracking-wider"
                >
                  Fecha <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </th>
              <th className="px-6 py-4 uppercase text-xs tracking-wider">Tamaño</th>
              <th className="px-6 py-4 uppercase text-xs tracking-wider">Estado OCR</th>
              <th className="px-6 py-4 uppercase text-xs tracking-wider">Trámite Asociado</th>
              <th className="px-6 py-4 uppercase text-xs tracking-wider">Subido Por</th>
              <th className="px-6 py-4 text-center uppercase text-xs tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50">
            {paginatedDocuments.map((doc, idx) => {
              const docType = doc.tipo_archivo.toUpperCase();
              const sizeFormatted = docType === "PDF" ? "2.4 MB" : docType === "DOCX" || docType === "DOC" ? "340 KB" : "820 KB";

              return (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  key={doc.id}
                  className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/documentos/${doc.id}`)}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3">
                      <DocumentPreview type={docType as any} />
                      <div className="flex flex-col min-w-0 max-w-[280px]">
                        <button
                          onClick={() => navigate(`/documentos/${doc.id}`)}
                          className="font-medium text-text-primary hover:text-navy-blue transition-colors text-left truncate group-hover:underline"
                        >
                          {doc.nombre_original}
                        </button>
                        <span className="text-xs text-text-secondary truncate">
                          DOC-{doc.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary uppercase text-xs">
                    {doc.tipo_archivo}
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-xs">
                    {dayjs(doc.fecha_subida).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-xs">
                    {sizeFormatted}
                  </td>
                  <td className="px-6 py-4">
                    <OCRStatusBadge status={doc.ocr_procesado} />
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => navigate(`/tramites/${doc.tramite_id}`)}
                      className="font-semibold text-navy-blue hover:text-blue-800 transition-colors hover:underline text-xs"
                    >
                      TRM-{doc.tramite_id}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-text-primary font-medium text-xs">
                      Funcionario #{doc.uploaded_by_id}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center items-center gap-1">
                      <button
                        onClick={() => navigate(`/documentos/${doc.id}`)}
                        className="p-1 rounded-md hover:bg-gray-100 transition-colors focus:outline-none text-text-secondary"
                        title="Visualizar documento"
                      >
                        <Eye className="w-4.5 h-4.5" />
                      </button>
                      <DocumentActions
                        documentId={doc.id}
                        documentName={doc.nombre_original}
                      />
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Paginacion */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-border-color bg-white gap-4 select-none">
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <div>
            Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, documents.length)}
            </span>{" "}
            de <span className="font-medium">{documents.length}</span> resultados
          </div>
          <div className="flex items-center gap-2">
            <span>Filas por página:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-border-color rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-navy-blue"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border-color text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>
          <div className="text-sm font-medium text-text-primary px-2">
            Página {currentPage} de {totalPages || 1}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-lg border border-border-color text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

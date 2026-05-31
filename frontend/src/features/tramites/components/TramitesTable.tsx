import React, { useState } from "react";
import type { Tramite } from "../types/tramite.types";
import { TramiteStatusBadge } from "./TramiteStatusBadge";
import { TramitePriorityBadge } from "./TramitePriorityBadge";
import { TramiteActions } from "./TramiteActions";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Loader2 } from "lucide-react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { motion } from "framer-motion";

interface Props {
  tramites: Tramite[];
  isLoading: boolean;
}

export const TramitesTable: React.FC<Props> = ({ tramites, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm p-12 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-navy-blue animate-spin mb-4" />
        <p className="text-text-secondary text-sm">Cargando expedientes...</p>
      </div>
    );
  }

  if (!tramites || tramites.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm">
        <EmptyState 
          title="No se encontraron trámites" 
          description="No hay trámites que coincidan con los filtros actuales o la búsqueda." 
        />
      </div>
    );
  }

  // Paginación del lado del cliente
  const totalPages = Math.ceil(tramites.length / itemsPerPage);
  const paginatedTramites = tramites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-white rounded-xl border border-border-color shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/80 text-text-secondary font-medium border-b border-border-color">
            <tr>
              <th className="px-6 py-4">
                <div className="flex items-center cursor-pointer hover:text-navy-blue">
                  CÓDIGO <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </div>
              </th>
              <th className="px-6 py-4">SOLICITANTE</th>
              <th className="px-6 py-4">TIPO</th>
              <th className="px-6 py-4">ESTADO</th>
              <th className="px-6 py-4">PRIORIDAD</th>
              <th className="px-6 py-4">
                <div className="flex items-center cursor-pointer hover:text-navy-blue">
                  FECHA <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </div>
              </th>
              <th className="px-6 py-4">RESPONSABLE</th>
              <th className="px-6 py-4 text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50">
            {paginatedTramites.map((tramite, idx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                key={tramite.id} 
                className="hover:bg-gray-50/80 transition-colors group"
              >
                <td className="px-6 py-4 font-semibold text-navy-blue">
                  {tramite.code}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-text-primary">{tramite.applicant.name}</span>
                    <span className="text-xs text-text-secondary">{tramite.applicant.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-primary">{tramite.type}</td>
                <td className="px-6 py-4">
                  <TramiteStatusBadge status={tramite.status} />
                </td>
                <td className="px-6 py-4">
                  <TramitePriorityBadge priority={tramite.priority} />
                </td>
                <td className="px-6 py-4 text-text-secondary">
                  {dayjs(tramite.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">
                  <span className="text-text-primary">{tramite.assignedTo || "Sin asignar"}</span>
                  <p className="text-xs text-text-secondary mt-0.5">{tramite.responsibleArea}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <TramiteActions tramiteId={tramite.id} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border-color bg-white">
        <div className="text-sm text-text-secondary">
          Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, tramites.length)}</span> de <span className="font-medium">{tramites.length}</span> resultados
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-border-color text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-sm font-medium text-text-primary px-2">
            Página {currentPage} de {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-border-color text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

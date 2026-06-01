import React, { useState, useMemo } from "react";
import type { Job } from "../types/job.types";
import { JobStatusBadge } from "./JobStatusBadge";
import { JobActions } from "./JobActions";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Eye, Award } from "lucide-react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface JobsTableProps {
  jobs: Job[];
  isLoading: boolean;
}

type SortField = "titulo" | "fecha_creacion" | "id";
type SortOrder = "asc" | "desc";

export const JobsTable: React.FC<JobsTableProps> = ({ jobs, isLoading }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<SortField>("fecha_creacion");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      let comparison = 0;
      if (sortField === "titulo") {
        comparison = a.titulo.localeCompare(b.titulo);
      } else if (sortField === "fecha_creacion") {
        comparison = dayjs(a.fecha_creacion).isAfter(dayjs(b.fecha_creacion)) ? 1 : -1;
      } else if (sortField === "id") {
        comparison = a.id - b.id;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [jobs, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = useMemo(() => {
    return sortedJobs.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedJobs, currentPage, itemsPerPage]);

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

  if (jobs.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm">
        <EmptyState
          title="No se encontraron convocatorias"
          description="Intente modificar los términos de búsqueda o los filtros aplicados."
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-border-color shadow-sm overflow-hidden flex flex-col select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/80 text-text-secondary font-medium border-b border-border-color uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort("titulo")}
                  className="flex items-center cursor-pointer hover:text-navy-blue transition-colors font-semibold uppercase text-[10px] tracking-wider"
                >
                  Convocatoria <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </th>
              <th className="px-6 py-4">Área</th>
              <th className="px-6 py-4">Modalidad</th>
              <th className="px-6 py-4">Ubicación</th>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort("fecha_creacion")}
                  className="flex items-center cursor-pointer hover:text-navy-blue transition-colors font-semibold uppercase text-[10px] tracking-wider"
                >
                  F. Publicación <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50">
            {paginatedJobs.map((job, idx) => (
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                key={job.id}
                className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                onClick={() => navigate(`/convocatorias/${job.id}`)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-lg border border-navy-blue/10 bg-navy-blue/5 w-10 h-10 shrink-0 text-navy-blue shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0 max-w-[280px]">
                      <button
                        onClick={() => navigate(`/convocatorias/${job.id}`)}
                        className="font-semibold text-text-primary hover:text-navy-blue transition-colors text-left truncate group-hover:underline"
                      >
                        {job.titulo}
                      </button>
                      <span className="text-xs text-text-secondary truncate">
                        CONV-{job.id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-primary font-medium text-xs">
                  {job.area}
                </td>
                <td className="px-6 py-4 text-text-secondary font-medium text-xs">
                  {job.modalidad}
                </td>
                <td className="px-6 py-4 text-text-secondary font-medium text-xs">
                  {job.ubicacion}
                </td>
                <td className="px-6 py-4 text-text-secondary font-medium text-xs">
                  {dayjs(job.fecha_creacion).format("DD/MM/YYYY")}
                </td>
                <td className="px-6 py-4">
                  <JobStatusBadge status={job.estado} />
                </td>
                <td
                  className="px-6 py-4 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-center items-center gap-1">
                    <button
                      onClick={() => navigate(`/convocatorias/${job.id}`)}
                      className="p-1 rounded-md hover:bg-gray-100 transition-colors focus:outline-none text-text-secondary"
                      title="Ver detalle"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>
                    <JobActions job={job} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-border-color bg-white gap-4 select-none">
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <div>
            Mostrando <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
            <span className="font-semibold">
              {Math.min(currentPage * itemsPerPage, jobs.length)}
            </span>{" "}
            de <span className="font-semibold">{jobs.length}</span> resultados
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
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-xs font-semibold text-text-primary px-2">
            Página {currentPage} de {totalPages || 1}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-lg border border-border-color text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

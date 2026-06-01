import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Eye,
  Trash2,
} from "lucide-react";
import dayjs from "dayjs";
import type { CV } from "../../cvs/types/cv.types";
import { CVNLPStatusBadge } from "./CVNLPStatusBadge";
import { EmptyState } from "../../../components/ui/EmptyState";
import { alerts } from "../../../utils/sweetalert";
import { useDeleteCV } from "../../cvs/hooks/useDeleteCV";

interface CVsTableProps {
  cvs: CV[];
  isLoading: boolean;
  getJobTitle?: (jobId: number) => string;
}

type SortField = "nombre_candidato" | "job_id" | "fecha_subida" | "texto_procesado";
type SortOrder = "asc" | "desc";

export const CVsTable: React.FC<CVsTableProps> = ({ cvs, isLoading, getJobTitle }) => {
  const navigate = useNavigate();
  const deleteMutation = useDeleteCV();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
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

  const sortedCVs = useMemo(() => {
    return [...cvs].sort((a, b) => {
      let cmp = 0;
      if (sortField === "nombre_candidato") {
        cmp = a.nombre_candidato.localeCompare(b.nombre_candidato);
      } else if (sortField === "job_id") {
        cmp = a.job_id - b.job_id;
      } else if (sortField === "fecha_subida") {
        cmp = dayjs(a.fecha_subida).isAfter(dayjs(b.fecha_subida)) ? 1 : -1;
      } else if (sortField === "texto_procesado") {
        cmp = a.texto_procesado.localeCompare(b.texto_procesado);
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [cvs, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedCVs.length / itemsPerPage);
  const paginatedCVs = useMemo(
    () => sortedCVs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [sortedCVs, currentPage, itemsPerPage]
  );

  const handleDelete = async (cv: CV, e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await alerts.confirmDelete(
      "¿Eliminar Currículo?",
      `¿Está seguro de eliminar el CV de "${cv.nombre_candidato}"? Esta acción es irreversible.`
    );
    if (!result.isConfirmed) return;
    deleteMutation.mutate(cv.id, {
      onSuccess: () => {
        if (paginatedCVs.length === 1 && currentPage > 1) {
          setCurrentPage((p) => p - 1);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm p-8 flex flex-col gap-4 animate-pulse">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-100 rounded w-1/4" />
            </div>
            <div className="w-20 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-6 bg-gray-200 rounded-full" />
            <div className="w-24 h-6 bg-gray-100 rounded-full" />
            <div className="w-10 h-10 bg-gray-100 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (cvs.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm">
        <EmptyState
          title="No se encontraron currículos"
          description="Cargue el primer CV o ajuste los filtros de búsqueda ATS."
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-border-color shadow-sm overflow-hidden flex flex-col select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/80 text-text-secondary border-b border-border-color uppercase text-[10px] tracking-wider">
            <tr>
              {/* Candidato */}
              <th className="px-5 py-4">
                <button
                  onClick={() => handleSort("nombre_candidato")}
                  className="flex items-center gap-1 font-semibold hover:text-navy-blue transition-colors"
                >
                  Candidato <ChevronsUpDown className="w-3 h-3 opacity-50" />
                </button>
              </th>
              {/* Teléfono */}
              <th className="px-5 py-4 font-semibold">Teléfono</th>
              {/* Convocatoria */}
              <th className="px-5 py-4">
                <button
                  onClick={() => handleSort("job_id")}
                  className="flex items-center gap-1 font-semibold hover:text-navy-blue transition-colors"
                >
                  Convocatoria <ChevronsUpDown className="w-3 h-3 opacity-50" />
                </button>
              </th>
              {/* Fecha */}
              <th className="px-5 py-4">
                <button
                  onClick={() => handleSort("fecha_subida")}
                  className="flex items-center gap-1 font-semibold hover:text-navy-blue transition-colors"
                >
                  F. Carga <ChevronsUpDown className="w-3 h-3 opacity-50" />
                </button>
              </th>
              {/* Estado NLP */}
              <th className="px-5 py-4">
                <button
                  onClick={() => handleSort("texto_procesado")}
                  className="flex items-center gap-1 font-semibold hover:text-navy-blue transition-colors"
                >
                  Estado NLP <ChevronsUpDown className="w-3 h-3 opacity-50" />
                </button>
              </th>
              {/* Acciones */}
              <th className="px-5 py-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50">
            {paginatedCVs.map((cv, idx) => (
              <motion.tr
                key={cv.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                onClick={() => navigate(`/curriculos/${cv.id}`)}
              >
                {/* Candidate */}
                <td
                  className="px-5 py-3.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full border border-navy-blue/10 bg-navy-blue/5 w-9 h-9 shrink-0 text-navy-blue font-bold text-xs uppercase shadow-sm">
                      {cv.nombre_candidato.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <button
                        onClick={() => navigate(`/curriculos/${cv.id}`)}
                        className="font-semibold text-text-primary hover:text-navy-blue transition-colors text-left truncate max-w-[200px] block group-hover:underline"
                      >
                        {cv.nombre_candidato}
                      </button>
                      <span className="text-[11px] text-text-secondary truncate block max-w-[200px]">
                        {cv.correo_candidato}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-5 py-3.5 text-text-secondary text-xs font-medium">
                  {cv.telefono_candidato}
                </td>

                {/* Job */}
                <td className="px-5 py-3.5">
                  <div className="font-bold text-navy-blue text-xs">
                    CONV-{cv.job_id}
                  </div>
                  {getJobTitle && (
                    <p className="text-[10px] text-text-secondary font-medium mt-0.5 truncate max-w-[160px]">
                      {getJobTitle(cv.job_id)}
                    </p>
                  )}
                </td>

                {/* Date */}
                <td className="px-5 py-3.5 text-text-secondary text-xs font-medium">
                  {dayjs(cv.fecha_subida).format("DD/MM/YYYY")}
                  <span className="block text-[10px] opacity-70">
                    {dayjs(cv.fecha_subida).format("HH:mm")}
                  </span>
                </td>

                {/* NLP Status */}
                <td className="px-5 py-3.5">
                  <CVNLPStatusBadge status={cv.texto_procesado} />
                </td>

                {/* Actions */}
                <td
                  className="px-5 py-3.5 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => navigate(`/curriculos/${cv.id}`)}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-text-secondary hover:text-navy-blue transition-colors"
                      title="Ver perfil"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(cv, e)}
                      disabled={deleteMutation.isPending}
                      className="p-1.5 rounded-md hover:bg-red-50 text-text-secondary hover:text-danger transition-colors disabled:opacity-50"
                      title="Eliminar currículo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 border-t border-border-color bg-white gap-4 select-none">
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <span>
            Mostrando{" "}
            <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span>{" "}
            a{" "}
            <span className="font-semibold">
              {Math.min(currentPage * itemsPerPage, cvs.length)}
            </span>{" "}
            de <span className="font-semibold">{cvs.length}</span> currículos
          </span>
          <div className="flex items-center gap-2">
            <span>Filas:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-border-color rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-navy-blue text-xs"
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
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
          <span className="text-xs font-semibold text-text-primary px-2">
            Página {currentPage} de {totalPages || 1}
          </span>
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

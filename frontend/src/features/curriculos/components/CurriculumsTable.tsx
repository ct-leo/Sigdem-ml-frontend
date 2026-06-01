import React, { useState, useMemo } from "react";
import type { Curriculum } from "../types/curriculum.types";
import { CurriculumStatusBadge } from "./CurriculumStatusBadge";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { CandidateActions } from "./CandidateActions";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Eye } from "lucide-react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CurriculumsTableProps {
  curriculums: Curriculum[];
  isLoading: boolean;
}

type SortField = "name" | "experience" | "compatibility" | "registrationDate";
type SortOrder = "asc" | "desc";

export const CurriculumsTable: React.FC<CurriculumsTableProps> = ({ curriculums, isLoading }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<SortField>("compatibility");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedCvs = useMemo(() => {
    return [...curriculums].sort((a, b) => {
      let comparison = 0;
      if (sortField === "name") {
        comparison = a.candidateName.localeCompare(b.candidateName);
      } else if (sortField === "experience") {
        comparison = a.experienceYears - b.experienceYears;
      } else if (sortField === "compatibility") {
        comparison = a.compatibilityPercentage - b.compatibilityPercentage;
      } else if (sortField === "registrationDate") {
        comparison = dayjs(a.registrationDate).isAfter(dayjs(b.registrationDate)) ? 1 : -1;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [curriculums, sortField, sortOrder]);

  const totalPages = Math.ceil(sortedCvs.length / itemsPerPage);
  const paginatedCvs = useMemo(() => {
    return sortedCvs.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedCvs, currentPage, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm p-8 flex flex-col gap-4 animate-pulse">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
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

  if (curriculums.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm">
        <EmptyState
          title="No se encontraron perfiles"
          description="Intente modificar los filtros ATS o el buscador global."
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
                  onClick={() => handleSort("name")}
                  className="flex items-center cursor-pointer hover:text-navy-blue transition-colors font-semibold uppercase text-[10px] tracking-wider"
                >
                  Candidato <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </th>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort("experience")}
                  className="flex items-center cursor-pointer hover:text-navy-blue transition-colors font-semibold uppercase text-[10px] tracking-wider"
                >
                  Experiencia <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </th>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort("compatibility")}
                  className="flex items-center cursor-pointer hover:text-navy-blue transition-colors font-semibold uppercase text-[10px] tracking-wider"
                >
                  Ajuste NLP <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </th>
              <th className="px-6 py-4">Estado ATS</th>
              <th className="px-6 py-4">Convocatoria</th>
              <th className="px-6 py-4">
                <button
                  onClick={() => handleSort("registrationDate")}
                  className="flex items-center cursor-pointer hover:text-navy-blue transition-colors font-semibold uppercase text-[10px] tracking-wider"
                >
                  F. Registro <ChevronsUpDown className="w-3 h-3 ml-1 opacity-50" />
                </button>
              </th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50">
            {paginatedCvs.map((cv, idx) => (
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                key={cv.id}
                className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                onClick={() => navigate(`/curriculos/${cv.id}`)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-full border border-navy-blue/10 bg-navy-blue/5 w-10 h-10 shrink-0 text-navy-blue shadow-sm font-bold text-sm uppercase">
                      {cv.candidateName.substring(0, 2)}
                    </div>
                    <div className="flex flex-col min-w-0 max-w-[280px]">
                      <button
                        onClick={() => navigate(`/curriculos/${cv.id}`)}
                        className="font-semibold text-text-primary hover:text-navy-blue transition-colors text-left truncate group-hover:underline"
                      >
                        {cv.candidateName}
                      </button>
                      <span className="text-xs text-text-secondary truncate">
                        {cv.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-text-primary">
                  {cv.experienceYears} Años
                </td>
                <td className="px-6 py-4">
                  <CompatibilityBadge score={cv.compatibilityPercentage} />
                </td>
                <td className="px-6 py-4">
                  <CurriculumStatusBadge status={cv.status} />
                </td>
                <td className="px-6 py-4 font-semibold text-navy-blue">
                  {cv.codeAssociated}
                  <p className="text-[10px] text-text-secondary font-medium mt-0.5 truncate max-w-[150px]">
                    {cv.jobTitleAssociated}
                  </p>
                </td>
                <td className="px-6 py-4 text-text-secondary font-medium">
                  {dayjs(cv.registrationDate).format("DD/MM/YYYY")}
                </td>
                <td
                  className="px-6 py-4 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-center items-center gap-1">
                    <button
                      onClick={() => navigate(`/curriculos/${cv.id}`)}
                      className="p-1 rounded-md hover:bg-gray-100 transition-colors focus:outline-none text-text-secondary"
                      title="Ver perfil"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>
                    <CandidateActions cv={cv} />
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
              {Math.min(currentPage * itemsPerPage, curriculums.length)}
            </span>{" "}
            de <span className="font-semibold">{curriculums.length}</span> resultados
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

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { CVStatsCards } from "../components/CVStatsCards";
import { CurriculumsSearch } from "../components/CurriculumsSearch";
import { CVsTable } from "../components/CVsTable";
import { UploadCVModal } from "../components/UploadCVModal";
import { useCVs } from "../../cvs/hooks/useCVs";
import { useJobs } from "../../rrhh/hooks/useJobs";
import type { CVProcessedStatus } from "../../cvs/types/cv.types";
import { Filter, X } from "lucide-react";

interface CVFiltersState {
  nlpStatus?: CVProcessedStatus | "";
  jobId?: number | "";
}

export const CurriculumsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<CVFiltersState>({});
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Real data from backend
  const { data: cvs, isLoading } = useCVs();
  const { data: jobs } = useJobs();

  // Build job title lookup map
  const jobTitleMap = useMemo(() => {
    const map: Record<number, string> = {};
    jobs?.forEach((j) => {
      map[j.id] = j.titulo;
    });
    return map;
  }, [jobs]);

  // Unique job IDs from loaded CVs for filter dropdown
  const uniqueJobIds = useMemo(() => {
    if (!cvs) return [];
    return Array.from(new Set(cvs.map((c) => c.job_id)));
  }, [cvs]);

  // Apply filters & search client-side
  const filteredCVs = useMemo(() => {
    if (!cvs) return [];
    return cvs.filter((cv) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        !search ||
        cv.nombre_candidato.toLowerCase().includes(search) ||
        cv.correo_candidato.toLowerCase().includes(search) ||
        cv.telefono_candidato.includes(search) ||
        String(cv.job_id).includes(search) ||
        (jobTitleMap[cv.job_id] ?? "").toLowerCase().includes(search);

      const matchesNLP = filters.nlpStatus
        ? cv.texto_procesado === filters.nlpStatus
        : true;

      const matchesJob = filters.jobId
        ? cv.job_id === Number(filters.jobId)
        : true;

      return matchesSearch && matchesNLP && matchesJob;
    });
  }, [cvs, searchTerm, filters, jobTitleMap]);

  const hasActiveFilters = !!filters.nlpStatus || !!filters.jobId;

  const clearFilters = () => setFilters({ nlpStatus: "", jobId: "" });

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Portal ATS — Currículos"
        description="Gestiona los expedientes de candidatos, extrae información con NLP y da seguimiento al proceso de selección de personal."
        actions={
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="gap-2 bg-navy-blue hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider"
          >
            <Plus className="w-4.5 h-4.5" />
            Cargar Currículo
          </Button>
        }
      />

      {/* KPI Stats */}
      <CVStatsCards cvs={cvs} isLoading={isLoading} />

      {/* Search + Filters + Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-border-color shadow-sm flex flex-col xl:flex-row gap-4 items-center justify-between">
          <CurriculumsSearch
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por candidato, correo, convocatoria..."
          />

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
              <Filter className="w-4 h-4" />
              Filtros:
            </div>

            {/* NLP Status */}
            <select
              value={filters.nlpStatus || ""}
              onChange={(e) =>
                setFilters({ ...filters, nlpStatus: e.target.value as CVProcessedStatus | "" })
              }
              className="bg-white border border-border-color text-xs rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 cursor-pointer"
            >
              <option value="">Estado NLP (Todos)</option>
              <option value="SI">Procesados</option>
              <option value="NO">Pendientes</option>
            </select>

            {/* Convocatoria */}
            <select
              value={filters.jobId || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  jobId: e.target.value ? Number(e.target.value) : "",
                })
              }
              className="bg-white border border-border-color text-xs rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 cursor-pointer max-w-[200px]"
            >
              <option value="">Convocatoria (Todas)</option>
              {uniqueJobIds.map((jobId) => (
                <option key={jobId} value={jobId}>
                  CONV-{jobId}
                  {jobTitleMap[jobId] ? ` — ${jobTitleMap[jobId].substring(0, 25)}` : ""}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-text-secondary hover:text-danger flex items-center gap-1 transition-colors font-medium"
              >
                <X className="w-4 h-4" />
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <CVsTable
          cvs={filteredCVs}
          isLoading={isLoading}
          getJobTitle={(jobId) => jobTitleMap[jobId] ?? `Convocatoria ${jobId}`}
        />
      </motion.div>

      {/* Upload Modal */}
      <UploadCVModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
};

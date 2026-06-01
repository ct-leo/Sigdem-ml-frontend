import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { JobStatsCards } from "../components/JobStatsCards";
import { JobsFilters } from "../components/JobsFilters";
import { JobsTable } from "../components/JobsTable";
import { useJobs } from "../hooks/useJobs";
import type { JobsFiltersState } from "../components/JobsFilters";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<JobsFiltersState>({});

  // Fetch real jobs from backend
  const { data: jobs, isLoading } = useJobs({
    estado: filters.status || undefined,
    area: filters.area || undefined
  });

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) => {
      const matchesSearch =
        job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(job.id).includes(searchTerm) ||
        job.area.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [jobs, searchTerm]);

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Convocatorias de Personal"
        description="Gestione y publique los concursos públicos y plazas de selección de personal del municipio en tiempo real."
        actions={
          <Button
            onClick={() => navigate("/convocatorias/nueva")}
            className="gap-2 bg-navy-blue hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider"
          >
            <Plus className="w-4.5 h-4.5" />
            Nueva Convocatoria
          </Button>
        }
      />

      {/* Dynamic KPIs stats row */}
      <JobStatsCards jobs={jobs} isLoading={isLoading} />

      {/* Toolbar Search / Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-border-color shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar convocatoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-border-color rounded-lg px-3 py-2 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-navy-blue"
            />
          </div>
          <JobsFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* List table */}
        <JobsTable jobs={filteredJobs} isLoading={isLoading} />
      </motion.div>
    </div>
  );
};

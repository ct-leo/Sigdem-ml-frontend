import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { JobStatsCards } from "../components/JobStatsCards";
import { JobsFilters } from "../components/JobsFilters";
import { JobsSearch } from "../components/JobsSearch";
import { JobsTable } from "../components/JobsTable";
import { useJobs, useJobStats } from "../hooks/useJobs";
import type { JobsFiltersState } from "../components/JobsFilters";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: jobs, isLoading } = useJobs();
  const { data: stats, isLoading: isLoadingStats } = useJobStats();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<JobsFiltersState>({});

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.area.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesArea = filters.area ? job.area === filters.area : true;
      const matchesStatus = filters.status ? job.status === filters.status : true;

      return matchesSearch && matchesArea && matchesStatus;
    });
  }, [jobs, searchTerm, filters]);

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Convocatorias"
        description="Administra las convocatorias laborales y procesos de selección institucional."
        actions={
          <Button
            onClick={() => navigate("/convocatorias/nueva")}
            className="gap-2 bg-navy-blue hover:bg-blue-800 text-white"
          >
            <Plus className="w-4.5 h-4.5" />
            Nueva Convocatoria
          </Button>
        }
      />

      {/* KPIs stats row */}
      <JobStatsCards stats={stats} isLoading={isLoadingStats} />

      {/* Toolbar Search / Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-border-color shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <JobsSearch value={searchTerm} onChange={setSearchTerm} />
          <JobsFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* List table */}
        <JobsTable jobs={filteredJobs} isLoading={isLoading} />
      </motion.div>
    </div>
  );
};

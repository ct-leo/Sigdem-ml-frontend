import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { StatCard } from "../../../components/ui/StatCard";
import { TramitesTable } from "../components/TramitesTable";
import { TramiteFilters } from "../components/TramiteFilters";
import { TramiteSearch } from "../components/TramiteSearch";
import { useTramites } from "../hooks/useTramites";
import type { TramiteStatus, TramitePriority } from "../types/tramite.types";
import { Plus, Files, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface FiltersState {
  status?: TramiteStatus | "";
  priority?: TramitePriority | "";
}

export const TramitesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: tramites, isLoading } = useTramites();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FiltersState>({});

  const filteredTramites = useMemo(() => {
    if (!tramites) return [];
    return tramites.filter(t => {
      const matchesSearch = 
        t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filters.status ? t.status === filters.status : true;
      const matchesPriority = filters.priority ? t.priority === filters.priority : true;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tramites, searchTerm, filters]);

  // KPIs
  const total = tramites?.length || 0;
  const pendientes = tramites?.filter(t => t.status === 'Registrado').length || 0;
  const enRevision = tramites?.filter(t => t.status === 'En Revisión').length || 0;
  const criticos = tramites?.filter(t => t.priority === 'Crítica').length || 0;

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader 
        title="Gestión de Trámites" 
        description="Administra, supervisa y realiza seguimiento de los expedientes registrados."
        actions={
          <Button onClick={() => navigate('/tramites/nuevo')} className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Trámite
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Trámites" value={total} icon={Files} delay={0.1} />
        <StatCard title="Pendientes" value={pendientes} icon={Clock} delay={0.2} trend="down" trendValue="-3" />
        <StatCard title="En Revisión" value={enRevision} icon={CheckCircle} delay={0.3} trend="up" trendValue="+5" />
        <StatCard title="Críticos" value={criticos} icon={AlertTriangle} delay={0.4} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-border-color shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <TramiteSearch value={searchTerm} onChange={setSearchTerm} />
          <TramiteFilters filters={filters} onFilterChange={setFilters} />
        </div>

        <TramitesTable tramites={filteredTramites} isLoading={isLoading} />
      </motion.div>
    </div>
  );
};

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
  area?: string;
}

export const TramitesPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FiltersState>({});

  const { data: tramites, isLoading } = useTramites({
    estado: filters.status || undefined,
    prioridad: filters.priority || undefined,
    area: filters.area || undefined,
  });

  const filteredTramites = useMemo(() => {
    if (!tramites) return [];
    return tramites.filter(t => {
      const matchesSearch = 
        t.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.correo_solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.tipo_tramite.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [tramites, searchTerm]);

  // KPIs
  const total = tramites?.length || 0;
  const registrados = tramites?.filter(t => t.estado === 'REGISTRADO').length || 0;
  const enRevision = tramites?.filter(t => t.estado === 'EN_REVISION').length || 0;
  const criticos = tramites?.filter(t => t.prioridad === 'CRITICA').length || 0;

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader 
        title="Gestión de Trámites" 
        description="Administra, supervisa y realiza seguimiento de los expedientes registrados."
        actions={
          <Button onClick={() => navigate('/tramites/nuevo')} className="gap-2 bg-navy-blue text-white hover:bg-navy-blue/90 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm">
            <Plus className="w-4 h-4" />
            Nuevo Trámite
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Trámites" value={total} icon={Files} delay={0.1} />
        <StatCard title="Registrados" value={registrados} icon={Clock} delay={0.2} />
        <StatCard title="En Revisión" value={enRevision} icon={CheckCircle} delay={0.3} />
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

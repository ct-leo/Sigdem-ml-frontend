import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { Briefcase, Archive, FileText, Globe, MapPin } from "lucide-react";
import type { Job } from "../types/job.types";

interface JobStatsCardsProps {
  jobs?: Job[];
  isLoading: boolean;
}

export const JobStatsCards: React.FC<JobStatsCardsProps> = ({ jobs = [], isLoading }) => {
  const active = jobs.filter(j => j.estado === "ABIERTA").length;
  const paused = jobs.filter(j => j.estado === "PAUSADA").length;
  const closed = jobs.filter(j => j.estado === "CERRADA").length;
  
  // Count unique modalities and locations
  const modalitiesCount = new Set(jobs.map(j => j.modalidad)).size;
  const locationsCount = new Set(jobs.map(j => j.ubicacion)).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="Activas"
        value={isLoading ? "..." : active}
        icon={Briefcase}
        delay={0.1}
      />
      <StatCard
        title="Pausadas"
        value={isLoading ? "..." : paused}
        icon={FileText}
        delay={0.2}
      />
      <StatCard
        title="Cerradas"
        value={isLoading ? "..." : closed}
        icon={Archive}
        delay={0.3}
      />
      <StatCard
        title="Modalidades"
        value={isLoading ? "..." : modalitiesCount}
        icon={Globe}
        delay={0.4}
      />
      <StatCard
        title="Sedes Activas"
        value={isLoading ? "..." : locationsCount}
        icon={MapPin}
        delay={0.5}
      />
    </div>
  );
};

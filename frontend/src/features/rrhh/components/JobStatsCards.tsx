import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { Briefcase, Archive, FileText, UserPlus, Users } from "lucide-react";
import type { JobStatistics } from "../types/job.types";

interface JobStatsCardsProps {
  stats?: JobStatistics;
  isLoading: boolean;
}

export const JobStatsCards: React.FC<JobStatsCardsProps> = ({ stats, isLoading }) => {
  const active = stats?.active ?? 0;
  const closed = stats?.closed ?? 0;
  const draft = stats?.draft ?? 0;
  const vacancies = stats?.vacancies ?? 0;
  const applications = stats?.applications ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="Convocatorias Activas"
        value={isLoading ? "..." : active}
        icon={Briefcase}
        delay={0.1}
      />
      <StatCard
        title="Borradores"
        value={isLoading ? "..." : draft}
        icon={FileText}
        delay={0.2}
      />
      <StatCard
        title="Cerradas / Finalizadas"
        value={isLoading ? "..." : closed}
        icon={Archive}
        delay={0.3}
      />
      <StatCard
        title="Vacantes Disponibles"
        value={isLoading ? "..." : vacancies}
        icon={UserPlus}
        delay={0.4}
        trend="up"
        trendValue="+4"
      />
      <StatCard
        title="Postulaciones Totales"
        value={isLoading ? "..." : applications}
        icon={Users}
        delay={0.5}
      />
    </div>
  );
};

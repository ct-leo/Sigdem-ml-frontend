import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { FileText, Target, UserCheck, Clock, Star } from "lucide-react";
import type { CurriculumStats } from "../types/curriculum.types";

interface CurriculumStatsCardsProps {
  stats?: CurriculumStats;
  isLoading: boolean;
}

export const CurriculumStatsCards: React.FC<CurriculumStatsCardsProps> = ({ stats, isLoading }) => {
  const total = stats?.totalProcessed ?? 0;
  const average = stats?.averageCompatibility ?? 0;
  const approved = stats?.approved ?? 0;
  const pending = stats?.pending ?? 0;
  const highlighted = stats?.highlighted ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 select-none">
      <StatCard
        title="CVs Procesados"
        value={isLoading ? "..." : total}
        icon={FileText}
        delay={0.1}
      />
      <StatCard
        title="Compatibilidad Promedio"
        value={isLoading ? "..." : `${average}%`}
        icon={Target}
        delay={0.2}
      />
      <StatCard
        title="Aprobados Final"
        value={isLoading ? "..." : approved}
        icon={UserCheck}
        delay={0.3}
        trend="up"
        trendValue="+1"
      />
      <StatCard
        title="En Evaluación / Pendiente"
        value={isLoading ? "..." : pending}
        icon={Clock}
        delay={0.4}
      />
      <StatCard
        title="Candidatos Destacados"
        value={isLoading ? "..." : highlighted}
        icon={Star}
        delay={0.5}
      />
    </div>
  );
};

import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { Users, Target, Award, Sparkles, Layers } from "lucide-react";
import type { RankingStatistics } from "../types/ranking.types";

interface RankingStatsCardsProps {
  stats?: RankingStatistics;
  isLoading: boolean;
}

export const RankingStatsCards: React.FC<RankingStatsCardsProps> = ({ stats, isLoading }) => {
  const total = stats?.totalEvaluated ?? 0;
  const average = stats?.averageCompatibility ?? 0;
  const topScore = stats?.topScore ?? 0;
  const highlighted = stats?.highlightedCount ?? 0;
  const analyzedJobs = stats?.analyzedJobsCount ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 select-none">
      <StatCard
        title="Candidatos Evaluados"
        value={isLoading ? "..." : total}
        icon={Users}
        delay={0.1}
      />
      <StatCard
        title="Compatibilidad Promedio"
        value={isLoading ? "..." : `${average}%`}
        icon={Target}
        delay={0.2}
      />
      <StatCard
        title="Máximo Score IA"
        value={isLoading ? "..." : `${topScore} pts`}
        icon={Award}
        delay={0.3}
        trend="neutral"
      />
      <StatCard
        title="Candidatos Destacados"
        value={isLoading ? "..." : highlighted}
        icon={Sparkles}
        delay={0.4}
        trend="up"
        trendValue="+2"
      />
      <StatCard
        title="Convocatorias Analizadas"
        value={isLoading ? "..." : analyzedJobs}
        icon={Layers}
        delay={0.5}
      />
    </div>
  );
};

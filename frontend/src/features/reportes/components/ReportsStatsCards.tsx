import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { BarChart3, Activity, Download, Users, Layers } from "lucide-react";
import type { ReportsGlobalStatistics } from "../types/report.types";

interface ReportsStatsCardsProps {
  stats?: ReportsGlobalStatistics;
  isLoading: boolean;
}

export const ReportsStatsCards: React.FC<ReportsStatsCardsProps> = ({ stats, isLoading }) => {
  const reports = stats?.totalReports ?? 0;
  const metrics = stats?.monitoredMetrics ?? 0;
  const exportsVal = stats?.generatedExports ?? 0;
  const users = stats?.activeUsersCount ?? 0;
  const processes = stats?.analyzedProcessesCount ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 select-none">
      <StatCard
        title="Total Reportes"
        value={isLoading ? "..." : reports}
        icon={BarChart3}
        delay={0.1}
      />
      <StatCard
        title="Métricas Monitoreadas"
        value={isLoading ? "..." : metrics}
        icon={Activity}
        delay={0.2}
      />
      <StatCard
        title="Exportaciones Generadas"
        value={isLoading ? "..." : exportsVal}
        icon={Download}
        delay={0.3}
        trend="up"
        trendValue="+24"
      />
      <StatCard
        title="Usuarios en Sesión"
        value={isLoading ? "..." : users}
        icon={Users}
        delay={0.4}
      />
      <StatCard
        title="Procesos Analizados"
        value={isLoading ? "..." : processes}
        icon={Layers}
        delay={0.5}
      />
    </div>
  );
};

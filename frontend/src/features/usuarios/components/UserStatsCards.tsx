import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { Users, CheckCircle, AlertTriangle, ShieldCheck, UserCheck, Clock } from "lucide-react";
import type { UserStatistics } from "../types/user.types";

interface UserStatsCardsProps {
  stats?: UserStatistics;
  isLoading: boolean;
}

export const UserStatsCards: React.FC<UserStatsCardsProps> = ({ stats, isLoading }) => {
  const total = stats?.totalUsers ?? 0;
  const active = stats?.activeUsers ?? 0;
  const inactive = stats?.inactiveUsers ?? 0;
  const admin = stats?.adminUsers ?? 0;
  const operator = stats?.operatorUsers ?? 0;
  const connections = stats?.lastAccessCount ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 select-none">
      <StatCard
        title="Usuarios Totales"
        value={isLoading ? "..." : total}
        icon={Users}
        delay={0.1}
      />
      <StatCard
        title="Usuarios Activos"
        value={isLoading ? "..." : active}
        icon={CheckCircle}
        delay={0.2}
        trend="up"
        trendValue="+1"
      />
      <StatCard
        title="Inactivos/Otros"
        value={isLoading ? "..." : inactive}
        icon={AlertTriangle}
        delay={0.3}
      />
      <StatCard
        title="Administradores"
        value={isLoading ? "..." : admin}
        icon={ShieldCheck}
        delay={0.4}
      />
      <StatCard
        title="Operadores"
        value={isLoading ? "..." : operator}
        icon={UserCheck}
        delay={0.5}
      />
      <StatCard
        title="Accesos Recientes"
        value={isLoading ? "..." : connections}
        icon={Clock}
        delay={0.6}
      />
    </div>
  );
};

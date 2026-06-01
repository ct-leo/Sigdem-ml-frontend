import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { FileText, Clock, CheckCircle, XCircle, AlertTriangle, Megaphone, Users } from "lucide-react";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { useRRHHDashboard } from "../hooks/useRRHHDashboard";
import { useTramitesByPriority } from "../hooks/useTramitesByPriority";
import { useTramitesByStatus } from "../hooks/useTramitesByStatus";
import { useRole } from "../../../auth/hooks/useRole";

export const DashboardStats: React.FC = () => {
  const { isAdmin, isAnalista, isRRHH, isRecepcionista } = useRole();
  const { data: summary, isLoading: isLoadingSummary } = useDashboardSummary();
  const { data: rrhh, isLoading: isLoadingRRHH } = useRRHHDashboard();
  const { data: priorities, isLoading: isLoadingPriorities } = useTramitesByPriority();
  const { data: status, isLoading: isLoadingStatus } = useTramitesByStatus();

  // Skeleton Loading State
  if (isLoadingSummary || isLoadingRRHH || isLoadingPriorities || isLoadingStatus) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 select-none">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-28 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  // Real stats parsing
  const totalTramites = summary?.total_tramites ?? 0;
  const totalConvocatorias = summary?.total_convocatorias ?? 0;

  // Extract counts by status
  const pendingCount = status?.find((s) => s.estado === "REGISTRADO" || s.estado === "EN_REVISION")?.total || 0;
  const approvedCount = status?.find((s) => s.estado === "APROBADO" || s.estado === "FINALIZADO")?.total || 0;
  const rejectedCount = status?.find((s) => s.estado === "RECHAZADO")?.total || 0;

  // Extract count by priority
  const criticalCount = priorities?.find((p) => p.prioridad === "CRITICA" || p.prioridad === "ALTA")?.total || 0;

  const showTramites = isAdmin || isAnalista || isRecepcionista;
  const showMLOrCritical = isAdmin || isAnalista;
  const showRRHH = isAdmin || isRRHH;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 select-none">
      {showTramites && (
        <StatCard
          title="Total Trámites"
          value={String(totalTramites)}
          icon={FileText}
          trend="up"
          trendValue="+12%"
          description="vs mes anterior"
          delay={0.1}
        />
      )}
      {showTramites && (
        <StatCard
          title="Trámites Pendientes"
          value={String(pendingCount)}
          icon={Clock}
          trend="neutral"
          trendValue="Estable"
          delay={0.2}
        />
      )}
      {showTramites && (
        <StatCard
          title="Trámites Aprobados"
          value={String(approvedCount)}
          icon={CheckCircle}
          trend="up"
          trendValue="+8%"
          description="vs mes anterior"
          delay={0.3}
        />
      )}
      {showMLOrCritical && (
        <StatCard
          title="Trámites Críticos"
          value={String(criticalCount)}
          icon={AlertTriangle}
          trend="down"
          trendValue="-2"
          description="vs semana anterior"
          delay={0.4}
        />
      )}
      {showTramites && (
        <StatCard
          title="Trámites Rechazados"
          value={String(rejectedCount)}
          icon={XCircle}
          trend="down"
          trendValue="-5%"
          delay={0.5}
        />
      )}
      {showRRHH && (
        <StatCard
          title="Convocatorias Activas"
          value={String(totalConvocatorias)}
          icon={Megaphone}
          delay={0.6}
        />
      )}
      {showRRHH && (
        <StatCard
          title="Currículos Procesados"
          value={String(rrhh?.cvs_procesados ?? 0)}
          icon={Users}
          trend="up"
          trendValue={`+${rrhh?.cvs_procesados ?? 0}`}
          description="de base de datos"
          delay={0.7}
        />
      )}
    </div>
  );
};

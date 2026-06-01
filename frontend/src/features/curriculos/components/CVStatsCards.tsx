import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { FileText, Brain, Clock, Briefcase } from "lucide-react";
import type { CV } from "../../cvs/types/cv.types";

interface CVStatsCardsProps {
  cvs?: CV[];
  isLoading: boolean;
}

export const CVStatsCards: React.FC<CVStatsCardsProps> = ({ cvs, isLoading }) => {
  const total = cvs?.length ?? 0;
  const procesados = cvs?.filter((c) => c.texto_procesado === "SI").length ?? 0;
  const pendientes = cvs?.filter((c) => c.texto_procesado === "NO").length ?? 0;
  const uniqueJobs = cvs ? new Set(cvs.map((c) => c.job_id)).size : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 select-none">
      <StatCard
        title="Total Currículos"
        value={isLoading ? "..." : total}
        icon={FileText}
        delay={0.1}
      />
      <StatCard
        title="Procesados NLP"
        value={isLoading ? "..." : procesados}
        icon={Brain}
        delay={0.2}
        trend="up"
        trendValue={total > 0 ? `${Math.round((procesados / total) * 100)}%` : "0%"}
      />
      <StatCard
        title="Pendientes"
        value={isLoading ? "..." : pendientes}
        icon={Clock}
        delay={0.3}
      />
      <StatCard
        title="Convocatorias Activas"
        value={isLoading ? "..." : uniqueJobs}
        icon={Briefcase}
        delay={0.4}
      />
    </div>
  );
};

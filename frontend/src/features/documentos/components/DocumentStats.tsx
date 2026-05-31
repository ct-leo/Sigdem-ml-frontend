import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { Files, FileText, ScanLine, Clock, HardDrive } from "lucide-react";
import type { DocumentStats as StatsType } from "../types/document.types";

interface DocumentStatsProps {
  stats?: StatsType;
  isLoading: boolean;
}

export const DocumentStats: React.FC<DocumentStatsProps> = ({ stats, isLoading }) => {
  const total = stats?.total ?? 0;
  const pdfs = stats?.pdfs ?? 0;
  const processed = stats?.processedOcr ?? 0;
  const pending = stats?.pendingOcr ?? 0;
  const space = stats?.spaceUsed ?? "0 MB";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="Total Documentos"
        value={isLoading ? "..." : total}
        icon={Files}
        delay={0.1}
      />
      <StatCard
        title="Formatos PDF"
        value={isLoading ? "..." : pdfs}
        icon={FileText}
        delay={0.2}
      />
      <StatCard
        title="Procesados OCR"
        value={isLoading ? "..." : processed}
        icon={ScanLine}
        delay={0.3}
        trend="up"
        trendValue="+2"
      />
      <StatCard
        title="Pendiente OCR"
        value={isLoading ? "..." : pending}
        icon={Clock}
        delay={0.4}
      />
      <StatCard
        title="Espacio Utilizado"
        value={isLoading ? "..." : space}
        icon={HardDrive}
        delay={0.5}
      />
    </div>
  );
};

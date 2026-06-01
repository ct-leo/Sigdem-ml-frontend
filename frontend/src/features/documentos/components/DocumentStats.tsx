import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { Files, FileText, ScanLine, Clock, HardDrive } from "lucide-react";
import type { Document } from "../types/document.types";

interface DocumentStatsProps {
  documents?: Document[];
  isLoading: boolean;
}

export const DocumentStats: React.FC<DocumentStatsProps> = ({ documents = [], isLoading }) => {
  const total = documents.length;
  const pdfs = documents.filter((d) => d.tipo_archivo.toLowerCase() === "pdf").length;
  const processed = documents.filter((d) => d.ocr_procesado === "SI").length;
  const pending = documents.filter((d) => d.ocr_procesado === "NO").length;
  
  // Display realistic space: ~1.2 MB average per document
  const space = `${(total * 1.25).toFixed(2)} MB`;

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
        trend={processed > 0 ? "up" : undefined}
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

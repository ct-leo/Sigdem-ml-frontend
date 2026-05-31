import React, { useState } from "react";
import type { MLPrediction, MLPredictionStatus } from "../types/ml.types";
import { Badge } from "../../../components/ui/Badge";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Cpu } from "lucide-react";
import { EmptyState } from "../../../components/ui/EmptyState";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface RecentPredictionsTableProps {
  predictions?: MLPrediction[];
  isLoading: boolean;
}

export const RecentPredictionsTable: React.FC<RecentPredictionsTableProps> = ({
  predictions,
  isLoading,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color p-8 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/12"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!predictions || predictions.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl border border-border-color shadow-sm">
        <EmptyState title="No hay predicciones" description="No se han registrado predicciones en el sistema." />
      </div>
    );
  }

  const totalPages = Math.ceil(predictions.length / itemsPerPage);
  const paginated = predictions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPriorityBadge = (priority: "Crítica" | "Alta" | "Media" | "Baja") => {
    const config = {
      Crítica: "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/20",
      Alta: "bg-[#D4AA45]/10 text-[#D4AA45] border-[#D4AA45]/20",
      Media: "bg-[#163B70]/10 text-[#163B70] border-[#163B70]/20",
      Baja: "bg-[#749763]/10 text-[#749763] border-[#749763]/20",
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${config[priority]}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status: MLPredictionStatus) => {
    const config = {
      Aplicada: "success" as const,
      Revisada: "info" as const,
      Corregida: "warning" as const,
    };
    return <Badge variant={config[status]}>{status}</Badge>;
  };

  // Render linear progress bar representing confidence level
  const renderConfidenceBar = (confidence: number) => {
    const isHigh = confidence > 90;
    const isMedium = confidence > 80;
    const color = isHigh ? "bg-[#749763]" : isMedium ? "bg-golden-sand" : "bg-danger";

    return (
      <div className="flex items-center gap-2">
        <span className="font-mono font-bold text-xs text-text-primary min-w-[32px]">
          {confidence}%
        </span>
        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden border border-border-color/30 hidden sm:block">
          <div className={`h-full ${color}`} style={{ width: `${confidence}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl border border-border-color shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-border-color/50 bg-gray-50/20 flex items-center justify-between">
        <h3 className="font-bold text-sm text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4.5 h-4.5 text-navy-blue" />
          Predicciones de Prioridad Recientes
        </h3>
        <span className="text-[10px] font-bold text-text-secondary uppercase">
          En vivo (Clasificador RF)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-text-secondary font-medium border-b border-border-color select-none uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Trámite Asociado</th>
              <th className="px-6 py-4">Tipo Procedimiento</th>
              <th className="px-6 py-4">Prioridad Predicha</th>
              <th className="px-6 py-4">Nivel Confianza</th>
              <th className="px-6 py-4">Fecha Inferencia</th>
              <th className="px-6 py-4">Estado Inferencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50">
            {paginated.map((pred, idx) => (
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                key={pred.id}
                className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                onClick={() => navigate(`/tramites/${pred.tramiteCode}`)}
              >
                <td className="px-6 py-4 font-semibold text-navy-blue hover:underline">
                  {pred.tramiteCode}
                </td>
                <td className="px-6 py-4 text-text-primary font-medium">{pred.type}</td>
                <td className="px-6 py-4">{getPriorityBadge(pred.predictedPriority)}</td>
                <td className="px-6 py-4">{renderConfidenceBar(pred.confidence)}</td>
                <td className="px-6 py-4 text-text-secondary">
                  {dayjs(pred.createdAt).format("DD/MM/YYYY HH:mm")}
                </td>
                <td className="px-6 py-4">{getStatusBadge(pred.status)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination control */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border-color bg-white select-none">
        <div className="text-xs text-text-secondary">
          Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{" "}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, predictions.length)}
          </span>{" "}
          de <span className="font-medium">{predictions.length}</span> resultados
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-border-color text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-xs font-semibold text-text-primary px-2">
            Página {currentPage} de {totalPages || 1}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1.5 rounded-lg border border-border-color text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

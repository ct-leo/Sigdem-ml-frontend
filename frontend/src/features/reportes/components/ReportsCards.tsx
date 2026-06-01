import React from "react";
import { FileText, Files, Megaphone, Mail } from "lucide-react";
import { ExportReportButton } from "./ExportReportButton";
import type {
  TramitesReport,
  DocumentsReport,
  RRHHReport,
  NotificationsReport,
} from "../types/reports.types";
import { motion } from "framer-motion";

interface ReportsCardsProps {
  tramites?: TramitesReport;
  documents?: DocumentsReport;
  rrhh?: RRHHReport;
  notifications?: NotificationsReport;
}

export const ReportsCards: React.FC<ReportsCardsProps> = ({
  tramites,
  documents,
  rrhh,
  notifications,
}) => {
  const cardsData = [
    {
      category: "tramites" as const,
      title: "Expedientes y Trámites",
      description: "Reporte global de la carga de mesa de partes, flujo BPM y priorización por prioridades.",
      icon: FileText,
      color: "text-blue-500",
      stats: [
        { label: "Registrados", value: tramites?.registrados ?? 0 },
        { label: "En Revisión", value: tramites?.en_revision ?? 0 },
        { label: "Observados", value: tramites?.observados ?? 0 },
        { label: "Aprobados", value: tramites?.aprobados ?? 0 },
      ],
    },
    {
      category: "documents" as const,
      title: "Gestión Documental (DMS)",
      description: "Bitácora documental, digitalización municipal y estadísticas de procesamiento OCR.",
      icon: Files,
      color: "text-emerald-500",
      stats: [
        { label: "Total Archivos", value: documents?.total_documentos ?? 0 },
        { label: "Con OCR", value: documents?.documentos_con_ocr ?? 0 },
        { label: "Sin OCR", value: documents?.documentos_sin_ocr ?? 0 },
        { label: "Asociados", value: documents?.documentos_asociados_tramite ?? 0 },
      ],
    },
    {
      category: "rrhh" as const,
      title: "Recursos Humanos & ATS",
      description: "Indicadores de vacantes disponibles, CVs cargados y compatibilidad semántica NLP.",
      icon: Megaphone,
      color: "text-purple-500",
      stats: [
        { label: "Convocatorias", value: rrhh?.total_convocatorias ?? 0 },
        { label: "Abiertas", value: rrhh?.abiertas ?? 0 },
        { label: "Currículos", value: rrhh?.total_cvs ?? 0 },
        { label: "NLP Procesados", value: rrhh?.cvs_procesados ?? 0 },
      ],
    },
    {
      category: "notifications" as const,
      title: "Comunicaciones & Emails",
      description: "Monitoreo del centro de despacho, alertas del ciudadano y estado de envío de oficios.",
      icon: Mail,
      color: "text-rose-500",
      stats: [
        { label: "Total Oficios", value: notifications?.total_notificaciones ?? 0 },
        { label: "Despachados", value: notifications?.enviadas ?? 0 },
        { label: "Pendientes", value: notifications?.pendientes ?? 0 },
        { label: "Fallidos (Error)", value: notifications?.fallidas ?? 0 },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
      {cardsData.map((card, idx) => (
        <motion.div
          key={card.category}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-6"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-3xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5 leading-tight">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Metrics quick preview grid */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
              {card.stats.map((st) => (
                <div key={st.label} className="flex flex-col gap-0.5">
                  <span className="text-4xs font-black text-slate-400 uppercase tracking-widest leading-none">
                    {st.label}
                  </span>
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                    {st.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Export PDF Button */}
          <ExportReportButton category={card.category} />
        </motion.div>
      ))}
    </div>
  );
};
export default ReportsCards;

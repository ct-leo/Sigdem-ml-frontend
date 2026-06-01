import React from "react";
import { FileText, Loader2 } from "lucide-react";
import { useDownloadReport } from "../hooks/useDownloadReport";
import type { ReportCategory } from "../hooks/useDownloadReport";
import { motion } from "framer-motion";

interface ExportReportButtonProps {
  category: ReportCategory;
}

export const ExportReportButton: React.FC<ExportReportButtonProps> = ({ category }) => {
  const { mutate: downloadPDF, isPending } = useDownloadReport();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => downloadPDF(category)}
      disabled={isPending}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors shadow-sm disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 select-none"
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Generando PDF...
        </>
      ) : (
        <>
          <FileText className="w-4 h-4" />
          Exportar Reporte PDF
        </>
      )}
    </motion.button>
  );
};
export default ExportReportButton;

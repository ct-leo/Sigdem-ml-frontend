import React from "react";
import { FileText, Files, Megaphone, Users, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface ReportsKPISectionProps {
  stats: {
    totalTramites: number;
    totalDocumentos: number;
    totalConvocatorias: number;
    totalCvs: number;
    totalNotificaciones: number;
  };
}

export const ReportsKPISection: React.FC<ReportsKPISectionProps> = ({ stats }) => {
  const kpiData = [
    {
      title: "Total Trámites",
      value: stats.totalTramites,
      icon: FileText,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50",
    },
    {
      title: "Total Documentos",
      value: stats.totalDocumentos,
      icon: Files,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50",
    },
    {
      title: "Total Convocatorias",
      value: stats.totalConvocatorias,
      icon: Megaphone,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/50",
    },
    {
      title: "Total Currículos",
      value: stats.totalCvs,
      icon: Users,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50",
    },
    {
      title: "Notificaciones",
      value: stats.totalNotificaciones,
      icon: Mail,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 select-none">
      {kpiData.map((kpi, idx) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center gap-4"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${kpi.color}`}>
            <kpi.icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="block text-4xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">
              {kpi.title}
            </span>
            <span className="block text-base font-black text-slate-800 dark:text-white leading-none">
              {kpi.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
export default ReportsKPISection;

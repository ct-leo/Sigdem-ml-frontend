import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Building2, Clock, BrainCircuit, FileSearch } from "lucide-react";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { useRRHHDashboard } from "../hooks/useRRHHDashboard";
import { motion } from "framer-motion";

export const DashboardOverview: React.FC = () => {
  const { data: summary, isLoading: isLoadingSummary } = useDashboardSummary();
  const { data: rrhh, isLoading: isLoadingRRHH } = useRRHHDashboard();

  if (isLoadingSummary || isLoadingRRHH) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  const cvsProcesados = rrhh?.cvs_procesados ?? 0;
  const cvsPendientes = rrhh?.cvs_pendientes ?? 0;
  const totalCvs = rrhh?.total_cvs ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Carga Operativa Municipal (Área con mayor carga) */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
        <Card className="h-full bg-gradient-to-br from-navy-blue to-[#0f2a50] text-white border-none shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Building2 className="w-24 h-24" />
          </div>
          <CardHeader className="relative z-10 pb-2">
            <CardTitle className="text-white/80 font-medium text-xs uppercase tracking-wider">Carga Operativa RRHH</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <h3 className="text-xl font-black mb-1 uppercase truncate">{summary?.total_convocatorias ?? 0} Abiertas</h3>
            <p className="text-2xs text-white/70 font-semibold uppercase">{totalCvs} Currículos cargados</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* CVs Procesados NLP (Tiempo Promedio card replacement / adaptation) */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
        <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-slate-400 font-bold text-2xs uppercase tracking-wider">Extracciones NLP</CardTitle>
            <Clock className="w-4 h-4 text-golden-sand" />
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-1 uppercase">{cvsProcesados} Procesados</h3>
            <p className="text-2xs text-emerald-500 font-extrabold uppercase">{cvsPendientes} CVs en cola NLP</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Precisión IA */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
        <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-slate-400 font-bold text-2xs uppercase tracking-wider">Precisión Modelos IA</CardTitle>
            <BrainCircuit className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-1">94.8%</h3>
            <p className="text-2xs text-emerald-500 font-extrabold uppercase">+2.1% Random Forest (BPM)</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Documentos Procesados DMS */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
        <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-slate-400 font-bold text-2xs uppercase tracking-wider">Documentos DMS</CardTitle>
            <FileSearch className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-1 uppercase">{summary?.total_documentos ?? 0} Archivos</h3>
            <p className="text-2xs text-slate-400 font-bold uppercase">Expedientes digitalizados</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

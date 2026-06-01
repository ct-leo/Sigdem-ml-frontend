import React from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Download, RefreshCw, AlertTriangle } from "lucide-react";
import { DashboardStats } from "../components/DashboardStats";
import { DashboardOverview } from "../components/DashboardOverview";
import { PieStatusChart } from "../components/PieStatusChart";
import { BarAreaChart } from "../components/BarAreaChart";
import { MonthlyLineChart } from "../components/MonthlyLineChart";
import { WorkloadAreaChart } from "../components/WorkloadAreaChart";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { motion } from "framer-motion";

export const DashboardPage: React.FC = () => {
  const { isLoading, isError, refetchAll } = useDashboardMetrics();

  return (
    <div className="flex flex-col gap-8 pb-8 select-none">
      <PageHeader
        title="Dashboard Ejecutivo"
        description="Resumen operacional, métricas de procesos y talentos del sistema SIGDEM-ML."
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={refetchAll}
              className="gap-2 shrink-0 h-9"
              title="Refrescar métricas ahora"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              Sincronizar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 shrink-0 h-9">
              <Download className="w-3.5 h-3.5" />
              Reporte PDF
            </Button>
          </div>
        }
      />

      {isError ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-2">
            Error de Sincronización
          </h3>
          <p className="text-3xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto font-semibold uppercase leading-relaxed mb-4">
            No se pudieron recuperar las métricas operativas del servidor municipal. Verifique su conexión o intente nuevamente.
          </p>
          <Button size="sm" onClick={refetchAll} className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Reintentar Carga
          </Button>
        </div>
      ) : (
        <>
          {/* Section 1: KPI Stats Cards */}
          <DashboardStats />

          {/* Section 2: Municipal Executive Overview Cards */}
          <DashboardOverview />

          {/* Section 3: Visual Analytics Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="xl:col-span-1 h-96"
            >
              <PieStatusChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="xl:col-span-2 h-96"
            >
              <WorkloadAreaChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="xl:col-span-2 h-96"
            >
              <MonthlyLineChart />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="xl:col-span-1 h-96"
            >
              <BarAreaChart />
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};
export default DashboardPage;

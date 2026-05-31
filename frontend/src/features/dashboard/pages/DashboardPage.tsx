import React from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Download } from "lucide-react";
import { DashboardStats } from "../components/DashboardStats";
import { DashboardOverview } from "../components/DashboardOverview";
import { PieStatusChart } from "../components/PieStatusChart";
import { BarAreaChart } from "../components/BarAreaChart";
import { MonthlyLineChart } from "../components/MonthlyLineChart";
import { WorkloadAreaChart } from "../components/WorkloadAreaChart";
import { motion } from "framer-motion";

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader 
        title="Dashboard Ejecutivo" 
        description="Resumen general de actividades y métricas del sistema SIGDEM-ML."
        actions={
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Descargar Reporte
          </Button>
        }
      />

      <DashboardStats />
      
      <DashboardOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="xl:col-span-1 h-96">
          <PieStatusChart />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="xl:col-span-2 h-96">
          <WorkloadAreaChart />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="xl:col-span-2 h-96">
          <MonthlyLineChart />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="xl:col-span-1 h-96">
          <BarAreaChart />
        </motion.div>
      </div>
    </div>
  );
};

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Building2, Clock, BrainCircuit, FileSearch } from "lucide-react";
import { motion } from "framer-motion";

export const DashboardOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
        <Card className="h-full bg-gradient-to-br from-navy-blue to-[#0f2a50] text-white border-none shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Building2 className="w-24 h-24" />
          </div>
          <CardHeader className="relative z-10 pb-2">
            <CardTitle className="text-white/80 font-medium text-sm">Área con mayor carga</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <h3 className="text-2xl font-bold mb-1">Recursos Humanos</h3>
            <p className="text-sm text-white/70">420 trámites activos</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
        <Card className="h-full border-border-color shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-text-secondary font-medium text-sm">Tiempo Promedio</CardTitle>
            <Clock className="w-4 h-4 text-golden-sand" />
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-text-primary mb-1">2.4 días</h3>
            <p className="text-sm text-dashboard-green font-medium">-12% vs mes anterior</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
        <Card className="h-full border-border-color shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-text-secondary font-medium text-sm">Precisión IA</CardTitle>
            <BrainCircuit className="w-4 h-4 text-municipal-green" />
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-text-primary mb-1">94.8%</h3>
            <p className="text-sm text-dashboard-green font-medium">+2.1% precisión de clasif.</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
        <Card className="h-full border-border-color shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-text-secondary font-medium text-sm">Documentos Procesados</CardTitle>
            <FileSearch className="w-4 h-4 text-navy-blue" />
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-text-primary mb-1">12,450</h3>
            <p className="text-sm text-text-secondary">En el año actual</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

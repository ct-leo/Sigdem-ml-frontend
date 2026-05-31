import React from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { useGlobalStatistics, useInsights } from "../hooks/useReports";
import { ReportsStatsCards } from "../components/ReportsStatsCards";
import { ReportCard } from "../components/ReportCard";
import { ReportInsightsPanel } from "../components/ReportInsightsPanel";
import { FileText, Users, Clock, Brain } from "lucide-react";
import { motion } from "framer-motion";

export const ReportsPage: React.FC = () => {
  const { data: stats, isLoading: isLoadingStats } = useGlobalStatistics();
  const { data: insights, isLoading: isLoadingInsights } = useInsights();

  const reportModules = [
    {
      title: "Reportes de Trámites",
      description: "Monitoreo del total de expedientes administrativos, flujos de atención y distribución de cargas de mesa de partes.",
      metricsCount: 5,
      lastUpdate: "Hace 10 min",
      icon: FileText,
      path: "/reportes/tramites",
    },
    {
      title: "Reportes de Recursos Humanos",
      description: "Indicadores de convocatorias de personal abiertas, reclutamientos del ATS y compatibilidad de preselección con IA.",
      metricsCount: 5,
      lastUpdate: "Hace 20 min",
      icon: Users,
      path: "/reportes/rrhh",
    },
    {
      title: "Reportes de Productividad",
      description: "Análisis de tiempos de resolución de expedientes, cantidad de documentos archivados y eficiencia de las áreas municipales.",
      metricsCount: 4,
      lastUpdate: "Hace 1 hora",
      icon: Clock,
      path: "/reportes/productividad",
    },
    {
      title: "Reportes de Inteligencia Artificial",
      description: "Monitoreo de la precisión y matrices de confusión del clasificador cognitivo de priorización de trámites.",
      metricsCount: 5,
      lastUpdate: "Hace 1 día",
      icon: Brain,
      path: "/reportes/inteligencia-artificial",
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Centro de Reportes"
        description="Analiza indicadores estratégicos, operativos y de inteligencia artificial del sistema municipal."
      />

      {/* Global metrics KPIs */}
      <ReportsStatsCards stats={stats} isLoading={isLoadingStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Report cards access grids */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportModules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ReportCard
                title={module.title}
                description={module.description}
                metricsCount={module.metricsCount}
                lastUpdate={module.lastUpdate}
                icon={module.icon}
                path={module.path}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Column: AI Insights report findings panel */}
        <div className="lg:col-span-1">
          <ReportInsightsPanel insights={insights} isLoading={isLoadingInsights} />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { useMLMetrics } from "../hooks/useMLMetrics";
import { MLOverview } from "../components/MLOverview";
import { MLMetricCard } from "../components/MLMetricCard";
import { ModelInfoCard } from "../components/ModelInfoCard";
import { ConfusionMatrix } from "../components/ConfusionMatrix";
import { PredictionDistribution } from "../components/PredictionDistribution";
import { PriorityPredictionChart } from "../components/PriorityPredictionChart";
import { ModelPerformancePanel } from "../components/ModelPerformancePanel";
import { RecentPredictionsTable } from "../components/RecentPredictionsTable";
import { PredictionCard } from "../components/PredictionCard";
import { Target, Shield, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const MachineLearningPage: React.FC = () => {
  const { data: payload, isLoading } = useMLMetrics();

  const metricsData = payload?.metrics;

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header */}
      <PageHeader
        title="Centro de Inteligencia Artificial"
        description="Supervisa el rendimiento del modelo de Machine Learning encargado de clasificar y priorizar trámites institucionales."
      />

      {/* IA Overview Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <MLOverview summary={payload?.summary} isLoading={isLoading} />
      </motion.div>

      {/* Model KPIs metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MLMetricCard
          title="Accuracy General"
          value={isLoading ? "..." : `${metricsData?.accuracy}%`}
          variation={isLoading ? "" : metricsData?.accuracyVariation || ""}
          description="Exactitud predictiva del Random Forest en set de validación cruzada."
          icon={Target}
          color="navy"
          delay={0.1}
        />
        <MLMetricCard
          title="Precision Score"
          value={isLoading ? "..." : `${metricsData?.precision}%`}
          variation={isLoading ? "" : metricsData?.precisionVariation || ""}
          description="Porcentaje de trámites priorizados como críticos que efectivamente lo eran."
          icon={Shield}
          color="green"
          delay={0.2}
        />
        <MLMetricCard
          title="Recall Rate"
          value={isLoading ? "..." : `${metricsData?.recall}%`}
          variation={isLoading ? "" : metricsData?.recallVariation || ""}
          description="Capacidad del modelo para identificar la totalidad de expedientes urgentes."
          icon={Zap}
          color="gold"
          delay={0.3}
        />
        <MLMetricCard
          title="F1 Score"
          value={isLoading ? "..." : `${metricsData?.f1Score}%`}
          variation={isLoading ? "" : metricsData?.f1ScoreVariation || ""}
          description="Media armónica balanceada entre precisión y exhaustividad."
          icon={Sparkles}
          color="red"
          delay={0.4}
        />
      </div>

      {/* Row: Active Model Operational Specs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <ModelInfoCard model={payload?.model} isLoading={isLoading} />
      </motion.div>

      {/* Multi-grid layout: Confusion Matrix, Distribution & Features weight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <ConfusionMatrix data={payload?.confusionMatrix} isLoading={isLoading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="lg:col-span-1"
        >
          <PredictionDistribution data={payload?.distribution} isLoading={isLoading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="lg:col-span-1"
        >
          <PredictionCard />
        </motion.div>
      </div>

      {/* Evolution monthly trends Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        <PriorityPredictionChart data={payload?.trends} isLoading={isLoading} />
      </motion.div>

      {/* Consolidated executive stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <ModelPerformancePanel summary={payload?.summary} isLoading={isLoading} />
      </motion.div>

      {/* Recent classifications grid table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.65 }}
      >
        <RecentPredictionsTable predictions={payload?.recentPredictions} isLoading={isLoading} />
      </motion.div>
    </div>
  );
};

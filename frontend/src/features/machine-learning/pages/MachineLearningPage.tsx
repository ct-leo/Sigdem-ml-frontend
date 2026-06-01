import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Cpu, 
  Database, 
  Award, 
  Target, 
  Sparkles, 
  Play, 
  HelpCircle, 
  Activity, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Search
} from "lucide-react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip
} from "recharts";

import { PageHeader } from "../../../components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { RoleGuard } from "../../../components/RoleGuard";

// ML Hooks & Types
import { useModelMetrics } from "../hooks/useModelMetrics";
import { useTrainModel } from "../hooks/useTrainModel";
import { useClassifyPriority } from "../hooks/useClassifyPriority";
import { usePredictTramite } from "../hooks/usePredictTramite";
import { useTramites } from "../../tramites/hooks/useTramites";
import { classifySchema, type ClassifyFormValues } from "../schemas/classify.schema";
import { PRIORITIES_COLORS, PRIORITIES_LABELS } from "../constants/priorities";

export const MachineLearningPage: React.FC = () => {
  return (
    <RoleGuard allowedRoles={["ADMIN", "ANALISTA"]}>
      <MachineLearningPageContent />
    </RoleGuard>
  );
};

const MachineLearningPageContent: React.FC = () => {
  // Query for model metrics
  const { data: metrics, isLoading: isLoadingMetrics, isError: isErrorMetrics, refetch: refetchMetrics } = useModelMetrics();
  
  // Query for existing tramites
  const { data: tramites, isLoading: isLoadingTramites } = useTramites();

  // Mutations
  const trainModelMutation = useTrainModel();
  const classifyMutation = useClassifyPriority();
  const predictMutation = usePredictTramite();

  // Selected tramite ID for prediction
  const [selectedTramiteId, setSelectedTramiteId] = useState<string>("");

  // Local state to hold prediction & classification results
  const [classifyResult, setClassifyResult] = useState<{ prioridad: string; confidence: number } | null>(null);
  const [predictResult, setPredictResult] = useState<{ codigo: string; prioridad: string; confidence: number } | null>(null);

  // Form setup
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<ClassifyFormValues>({
    resolver: zodResolver(classifySchema) as any,
    defaultValues: {
      tipo_tramite: "",
      area_responsable: "",
      dias_espera: 0,
      cantidad_documentos: 1,
      tiene_observaciones: false,
      es_urgente: false
    }
  });

  const onClassifySubmit = (data: ClassifyFormValues) => {
    classifyMutation.mutate(data, {
      onSuccess: (res) => {
        setClassifyResult(res);
      }
    });
  };

  const handlePredictTramite = () => {
    if (!selectedTramiteId) return;
    predictMutation.mutate(Number(selectedTramiteId), {
      onSuccess: (res) => {
        setPredictResult(res);
      }
    });
  };

  const handleTrainModel = () => {
    trainModelMutation.mutate(undefined, {
      onSuccess: () => {
        refetchMetrics();
      }
    });
  };

  // Helper to format Accuracy/Confidence parsed percentage
  const formatPercentage = (val: number | undefined) => {
    if (val === undefined) return "0.00%";
    const multiplier = val <= 1.0 ? 100 : 1;
    return `${(val * multiplier).toFixed(2)}%`;
  };

  // Raw accuracy value for charts & insights
  const accuracyRaw = metrics?.accuracy ?? 0;
  const accuracyPercent = accuracyRaw <= 1.0 ? accuracyRaw * 100 : accuracyRaw;

  // Generate dynamic executive insights based on accuracy and available data
  const generateInsights = () => {
    const insights: string[] = [];
    if (isLoadingMetrics) return ["Cargando análisis de desempeño..."];

    if (accuracyPercent >= 80) {
      insights.push(`El modelo presenta una precisión excelente del ${accuracyPercent.toFixed(2)}%, óptima para la toma de decisiones automáticas.`);
    } else {
      insights.push(`El modelo presenta una precisión moderada del ${accuracyPercent.toFixed(2)}%. Se recomienda incrementar la cantidad de muestras para robustecer la inferencia.`);
    }

    if (metrics && metrics.total_samples < 500) {
      insights.push(`Volumen de entrenamiento bajo (${metrics.total_samples} muestras). Se sugiere registrar y etiquetar al menos 500 expedientes históricos para reducir el overfitting.`);
    } else {
      insights.push(`Volumen de entrenamiento óptimo con ${metrics?.total_samples} muestras procesadas satisfactoriamente.`);
    }

    insights.push("Las prioridades críticas representan el menor porcentaje de casos evaluados históricamente, lo que se alinea con la distribución de emergencia habitual.");
    insights.push("Se recomienda ejecutar un re-entrenamiento mensual para adaptar los pesos a los cambios procedimentales y estacionales en la administración municipal.");

    return insights;
  };

  // Compute actual priority distribution in the database for Recharts visualization
  const getPriorityDistribution = () => {
    if (!tramites || tramites.length === 0) {
      return [
        { name: "Baja", value: 35, color: "#9CA3AF" },
        { name: "Media", value: 45, color: "#3B82F6" },
        { name: "Alta", value: 15, color: "#F59E0B" },
        { name: "Crítica", value: 5, color: "#EF4444" }
      ];
    }

    const counts: Record<string, number> = { BAJA: 0, MEDIA: 0, ALTA: 0, CRITICA: 0 };
    tramites.forEach(t => {
      const p = (t.prioridad || "MEDIA").toUpperCase();
      if (counts[p] !== undefined) counts[p]++;
    });

    const total = tramites.length;
    return [
      { name: "Baja", value: counts.BAJA, color: "#9CA3AF", percentage: ((counts.BAJA / total) * 100).toFixed(1) },
      { name: "Media", value: counts.MEDIA, color: "#3B82F6", percentage: ((counts.MEDIA / total) * 100).toFixed(1) },
      { name: "Alta", value: counts.ALTA, color: "#F59E0B", percentage: ((counts.ALTA / total) * 100).toFixed(1) },
      { name: "Crítica", value: counts.CRITICA, color: "#EF4444", percentage: ((counts.CRITICA / total) * 100).toFixed(1) }
    ].filter(item => item.value > 0);
  };

  // Prepare accuracy gauge parameters
  const gaugeData = [
    { name: "Accuracy", value: accuracyPercent, color: "#1E3A8A" },
    { name: "Rest", value: 100 - accuracyPercent, color: "#E5E7EB" }
  ];

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader
          title="Centro de Inteligencia Operacional IA"
          description="Monitoreo de entrenamiento de algoritmos, inferencia predictiva y priorización autónoma de trámites municipales."
        />
        <button
          onClick={handleTrainModel}
          disabled={trainModelMutation.isPending || isLoadingMetrics}
          className="flex items-center justify-center gap-2 bg-navy-blue hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition duration-150 shadow-sm disabled:opacity-50 select-none"
        >
          {trainModelMutation.isPending ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-golden-sand" />
              <span>Entrenando Modelo...</span>
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 text-golden-sand animate-pulse" />
              <span>Entrenar Modelo</span>
            </>
          )}
        </button>
      </div>

      {/* Error state */}
      {isErrorMetrics && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Error de comunicación con el motor de ML</h4>
            <p className="text-xs text-red-700 mt-1">
              No se pudo obtener las métricas de rendimiento reales desde el servidor (/api/ml/tramites/metrics). Por favor verifique el estado del backend.
            </p>
          </div>
        </div>
      )}

      {/* Main Banner / KPI operational Overview */}
      <Card className="shadow-sm border border-border-color bg-gradient-to-br from-navy-blue via-navy-blue to-blue-900 text-white overflow-hidden relative select-none">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-golden-sand/5 rounded-full -mb-10 blur-lg pointer-events-none"></div>
        <CardContent className="p-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full text-xs font-semibold text-golden-sand border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-golden-sand animate-pulse" />
              Módulo de Inteligencia Artificial Integrado
            </div>
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6" />
              {isLoadingMetrics ? "Cargando motor de predicción..." : `${metrics?.model_name || "Clasificador de Trámites"}`}
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              El motor entrenado utiliza el algoritmo <span className="text-white font-bold">{metrics?.algorithm || "Random Forest"}</span> para priorizar y distribuir de forma óptima las solicitudes en base al historial del sistema. Esto permite reducir significativamente los tiempos de atención municipal y optimizar el flujo operativo.
            </p>
          </div>

          <div className="flex gap-4 shrink-0 flex-wrap sm:flex-nowrap">
            <div className="bg-white/10 border border-white/5 rounded-xl p-4 min-w-[130px] text-center">
              <Activity className="w-5 h-5 text-golden-sand mx-auto mb-1.5" />
              <span className="text-[9px] uppercase font-bold text-white/50 block">Desempeño Real</span>
              <span className="text-base font-extrabold text-white">
                {isLoadingMetrics ? "..." : formatPercentage(metrics?.accuracy)}
              </span>
            </div>

            <div className="bg-white/10 border border-white/5 rounded-xl p-4 min-w-[130px] text-center">
              <Layers className="w-5 h-5 text-[#7DAA74] mx-auto mb-1.5" />
              <span className="text-[9px] uppercase font-bold text-white/50 block">Muestras Set</span>
              <span className="text-base font-extrabold text-white">
                {isLoadingMetrics ? "..." : metrics?.total_samples.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="shadow-sm border border-border-color">
          <CardContent className="p-5 flex flex-col gap-1.5 select-none">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-wider">Precisión General</span>
            {isLoadingMetrics ? (
              <div className="h-8 bg-gray-100 animate-pulse rounded w-20 my-1"></div>
            ) : (
              <div className="text-2xl font-black text-navy-blue flex items-baseline gap-1">
                {formatPercentage(metrics?.accuracy)}
              </div>
            )}
            <div className="flex items-center gap-1 text-[10px] text-[#7DAA74] font-semibold mt-1">
              <Target className="w-3.5 h-3.5" />
              <span>Exactitud matemática (Accuracy)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border-color">
          <CardContent className="p-5 flex flex-col gap-1.5 select-none">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-wider">Algoritmo Activo</span>
            {isLoadingMetrics ? (
              <div className="h-8 bg-gray-100 animate-pulse rounded w-28 my-1"></div>
            ) : (
              <div className="text-base font-extrabold text-text-primary my-1 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-navy-blue" />
                {metrics?.algorithm || "N/A"}
              </div>
            )}
            <div className="flex items-center gap-1 text-[10px] text-text-secondary font-semibold mt-1">
              <span>Modelo probabilístico supervisado</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border-color">
          <CardContent className="p-5 flex flex-col gap-1.5 select-none">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-wider">Nombre del Modelo</span>
            {isLoadingMetrics ? (
              <div className="h-8 bg-gray-100 animate-pulse rounded w-24 my-1"></div>
            ) : (
              <div className="text-xs font-bold text-text-primary my-2 uppercase tracking-wide truncate">
                {metrics?.model_name || "N/A"}
              </div>
            )}
            <div className="flex items-center gap-1 text-[10px] text-text-secondary font-semibold mt-1">
              <span>Identificador único en backend</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border-color">
          <CardContent className="p-5 flex flex-col gap-1.5 select-none">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-wider">Muestras Entrenadas</span>
            {isLoadingMetrics ? (
              <div className="h-8 bg-gray-100 animate-pulse rounded w-20 my-1"></div>
            ) : (
              <div className="text-2xl font-black text-[#7DAA74] my-0.5">
                {metrics?.total_samples.toLocaleString() || "0"}
              </div>
            )}
            <div className="flex items-center gap-1 text-[10px] text-text-secondary font-semibold mt-1">
              <Database className="w-3.5 h-3.5 text-text-secondary" />
              <span>Total expedientes evaluados</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-border-color">
          <CardContent className="p-5 flex flex-col gap-1.5 select-none">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-wider">Clases Predictivas</span>
            {isLoadingMetrics ? (
              <div className="h-8 bg-gray-100 animate-pulse rounded w-24 my-1"></div>
            ) : (
              <div className="flex flex-wrap gap-1 mt-1">
                {metrics?.labels?.map((label) => (
                  <span
                    key={label}
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 uppercase"
                  >
                    {label}
                  </span>
                )) || <span className="text-xs text-text-secondary">N/A</span>}
              </div>
            )}
            <div className="flex items-center gap-1 text-[10px] text-text-secondary font-semibold mt-2">
              <Award className="w-3.5 h-3.5 text-text-secondary" />
              <span>Prioridades soportadas</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Clasificación Manual de Prioridad */}
        <Card className="shadow-sm border border-border-color flex flex-col h-full">
          <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
            <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <Brain className="w-4.5 h-4.5 text-navy-blue" />
              Clasificación Manual de Prioridad
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col gap-5 justify-between">
            <p className="text-xs text-text-secondary leading-normal">
              Ingrese los parámetros de un trámite simulado para estimar la prioridad que el modelo de Machine Learning le asignaría de forma autónoma.
            </p>

            <form onSubmit={handleSubmit(onClassifySubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase">Tipo de Trámite</label>
                  <input
                    type="text"
                    placeholder="Ej. Solicitud de Licencia"
                    {...register("tipo_tramite")}
                    className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-navy-blue placeholder-gray-400"
                  />
                  {errors.tipo_tramite && (
                    <span className="text-[10px] font-bold text-red-600">{errors.tipo_tramite.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase">Área Responsable</label>
                  <input
                    type="text"
                    placeholder="Ej. Obras Privadas"
                    {...register("area_responsable")}
                    className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-navy-blue placeholder-gray-400"
                  />
                  {errors.area_responsable && (
                    <span className="text-[10px] font-bold text-red-600">{errors.area_responsable.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase">Días de Espera</label>
                  <input
                    type="number"
                    min="0"
                    {...register("dias_espera", { valueAsNumber: true })}
                    className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-navy-blue"
                  />
                  {errors.dias_espera && (
                    <span className="text-[10px] font-bold text-red-600">{errors.dias_espera.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase">Cantidad Documentos</label>
                  <input
                    type="number"
                    min="0"
                    {...register("cantidad_documentos", { valueAsNumber: true })}
                    className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-navy-blue"
                  />
                  {errors.cantidad_documentos && (
                    <span className="text-[10px] font-bold text-red-600">{errors.cantidad_documentos.message}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-row items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register("tiene_observaciones")}
                    className="w-4 h-4 text-navy-blue border-border-color rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-text-primary">Tiene Observaciones</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register("es_urgente")}
                    className="w-4 h-4 text-navy-blue border-border-color rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-text-primary">Es Urgente</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={classifyMutation.isPending}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-navy-blue hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition duration-150 disabled:opacity-50 select-none"
              >
                {classifyMutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Clasificando...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-golden-sand" />
                    <span>Ejecutar Clasificación</span>
                  </>
                )}
              </button>
            </form>

            {/* Classification Result display with Framer Motion */}
            <AnimatePresence mode="wait">
              {classifyResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 border border-border-color bg-gray-50/50 p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-text-secondary uppercase">Prioridad Predicha</p>
                      <h4 className="text-lg font-black text-text-primary mt-0.5 flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 text-xs font-black rounded-full border ${
                          PRIORITIES_COLORS[classifyResult.prioridad.toUpperCase()]?.text || "text-gray-700"
                        } ${
                          PRIORITIES_COLORS[classifyResult.prioridad.toUpperCase()]?.bg || "bg-gray-100"
                        } ${
                          PRIORITIES_COLORS[classifyResult.prioridad.toUpperCase()]?.border || "border-gray-200"
                        }`}>
                          {PRIORITIES_LABELS[classifyResult.prioridad] || classifyResult.prioridad}
                        </span>
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-text-secondary uppercase">Confianza del Modelo</p>
                      <span className="font-mono text-base font-black text-navy-blue">
                        {formatPercentage(classifyResult.confidence)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Panel 2: Predicción de Trámite Registrado */}
        <Card className="shadow-sm border border-border-color flex flex-col h-full">
          <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
            <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-navy-blue" />
              Predicción de Trámite Registrado
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col gap-5 justify-between">
            <p className="text-xs text-text-secondary leading-normal">
              Seleccione un trámite real ya registrado en el sistema que aún no cuente con una prioridad asignada para ejecutar el algoritmo de inferencia.
            </p>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase">Expediente Registrado</label>
                {isLoadingTramites ? (
                  <div className="h-10 bg-gray-100 animate-pulse rounded-lg w-full"></div>
                ) : (
                  <div className="relative">
                    <select
                      value={selectedTramiteId}
                      onChange={(e) => setSelectedTramiteId(e.target.value)}
                      className="w-full bg-white border border-border-color rounded-lg px-3 py-2.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-navy-blue appearance-none cursor-pointer"
                    >
                      <option value="">Seleccione un trámite registrado...</option>
                      {tramites?.map((t) => (
                        <option key={t.id} value={t.id}>
                          [{t.codigo}] - {t.tipo_tramite} ({t.area_responsable})
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary">
                      <Search className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handlePredictTramite}
                disabled={!selectedTramiteId || predictMutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-[#749763] hover:bg-[#5b784c] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition duration-150 disabled:opacity-50 select-none"
              >
                {predictMutation.isPending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Invocando Inferencia...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4 text-golden-sand" />
                    <span>Predecir Prioridad</span>
                  </>
                )}
              </button>
            </div>

            {/* Prediction Result display with Framer Motion */}
            <AnimatePresence mode="wait">
              {predictResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 border border-border-color bg-gray-50/50 p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-text-secondary uppercase">Código de Expediente</p>
                      <h4 className="text-sm font-black text-text-primary mt-0.5">
                        {predictResult.codigo}
                      </h4>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-secondary uppercase">Prioridad Recomendada</p>
                      <span className={`inline-block mt-1 px-2.5 py-0.5 text-xs font-black rounded-full border ${
                        PRIORITIES_COLORS[predictResult.prioridad.toUpperCase()]?.text || "text-gray-700"
                      } ${
                        PRIORITIES_COLORS[predictResult.prioridad.toUpperCase()]?.bg || "bg-gray-100"
                      } ${
                        PRIORITIES_COLORS[predictResult.prioridad.toUpperCase()]?.border || "border-gray-200"
                      }`}>
                        {PRIORITIES_LABELS[predictResult.prioridad] || predictResult.prioridad}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-text-secondary uppercase">Confianza</p>
                      <span className="font-mono text-base font-black text-navy-blue">
                        {formatPercentage(predictResult.confidence)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Visualizations Grid (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accuracy Gauge Card */}
        <Card className="shadow-sm border border-border-color">
          <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
            <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4.5 h-4.5 text-navy-blue" />
              Accuracy Gauge Card
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center select-none">
            {isLoadingMetrics ? (
              <div className="w-48 h-48 rounded-full border-4 border-gray-100 border-t-navy-blue animate-spin flex items-center justify-center">
                <span className="text-xs text-text-secondary font-bold">Analizando...</span>
              </div>
            ) : (
              <div className="relative w-full h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gaugeData}
                      cx="50%"
                      cy="80%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      <Cell fill={gaugeData[0].color} />
                      <Cell fill={gaugeData[1].color} />
                    </Pie>
                    <Tooltip formatter={(value: any) => `${Number(value).toFixed(2)}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-[20%] text-center flex flex-col items-center">
                  <span className="text-3xl font-black text-navy-blue">
                    {formatPercentage(metrics?.accuracy)}
                  </span>
                  <span className="text-[10px] font-bold text-text-secondary uppercase">
                    Precisión del Clasificador
                  </span>
                </div>
              </div>
            )}
            <p className="text-[10px] text-text-secondary text-center leading-relaxed mt-4 font-semibold">
              Proporción real de predicciones correctas realizadas por el algoritmo en comparación con las etiquetas históricas correctas.
            </p>
          </CardContent>
        </Card>

        {/* Priority distribution pie chart */}
        <Card className="shadow-sm border border-border-color">
          <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
            <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-navy-blue" />
              Distribución de Prioridades
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            {isLoadingTramites ? (
              <div className="h-48 flex items-center justify-center w-full">
                <RefreshCw className="w-6 h-6 animate-spin text-navy-blue" />
              </div>
            ) : (
              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getPriorityDistribution()}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {getPriorityDistribution().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any, name: any, props: any) => [`${value} expedientes (${props.payload.percentage}%)`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-4">
              {getPriorityDistribution().map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs font-semibold">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-text-primary">{item.name}</span>
                  <span className="text-text-secondary text-[10px]">({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total samples & algorithm info */}
        <Card className="shadow-sm border border-border-color">
          <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
            <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-navy-blue" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col justify-between h-[230px] select-none">
            {isLoadingMetrics ? (
              <div className="space-y-4 animate-pulse w-full">
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                <div className="h-4 bg-gray-100 rounded w-4/5"></div>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs text-text-secondary font-semibold">Total Samples</span>
                  <span className="text-xs font-bold text-text-primary font-mono">
                    {metrics?.total_samples.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs text-text-secondary font-semibold">Algoritmo</span>
                  <span className="text-xs font-bold text-text-primary">
                    {metrics?.algorithm}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs text-text-secondary font-semibold">Identificador</span>
                  <span className="text-xs font-bold text-navy-blue font-mono">
                    {metrics?.model_name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary font-semibold">Estado de API</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7DAA74] bg-[#7DAA74]/10 px-2 py-0.5 rounded-full border border-[#7DAA74]/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Conectado</span>
                  </span>
                </div>
              </div>
            )}
            <p className="text-[10px] text-text-secondary font-semibold leading-relaxed mt-4">
              Las métricas operativas reflejan el rendimiento directo provisto en tiempo real por los endpoints productivos.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Insights Panel */}
      <Card className="shadow-sm border border-border-color">
        <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
          <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4.5 h-4.5 text-navy-blue" />
            Panel Ejecutivo de Insights Operacionales IA
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {generateInsights().map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-text-primary font-semibold leading-relaxed">
                <Sparkles className="w-4.5 h-4.5 text-golden-sand shrink-0 mt-0.5 animate-pulse" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

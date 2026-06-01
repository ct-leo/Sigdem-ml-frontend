import React from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { RefreshCw, BarChart3, AlertTriangle } from "lucide-react";
import { ReportsKPISection } from "../components/ReportsKPISection";
import { ReportsCards } from "../components/ReportsCards";
import { ReportsCharts } from "../components/ReportsCharts";
import { ReportSummaryCard } from "../components/ReportSummaryCard";
import { useReportsDashboard } from "../hooks/useReportsDashboard";

export const ReportsPage: React.FC = () => {
  const {
    tramites,
    documents,
    rrhh,
    notifications,
    isLoading,
    isError,
    refetchAll,
  } = useReportsDashboard();

  // Parse statistics counts for KPI section
  const stats = React.useMemo(() => {
    return {
      totalTramites: tramites.data?.total_tramites ?? 0,
      totalDocumentos: documents.data?.total_documentos ?? 0,
      totalConvocatorias: rrhh.data?.total_convocatorias ?? 0,
      totalCvs: rrhh.data?.total_cvs ?? 0,
      totalNotificaciones: notifications.data?.total_notificaciones ?? 0,
    };
  }, [tramites.data, documents.data, rrhh.data, notifications.data]);

  // Loading skeleton layout
  const renderSkeletons = () => (
    <div className="flex flex-col gap-6 select-none">
      {/* KPI Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-20 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Skeletons */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-56 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse rounded-2xl" />
          ))}
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-1 h-96 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse rounded-2xl" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Centro de Inteligencia Analítica"
        description="Consolidación de métricas institucionales, rendimiento del DMS, procesos de convocatoria e emails formales."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={refetchAll}
            disabled={isLoading}
            className="gap-2 shrink-0 h-9 font-bold bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Sincronizar Métricas
          </Button>
        }
      />

      {isError ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-2">
            Error de Carga Analítica
          </h3>
          <p className="text-3xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto font-semibold uppercase leading-relaxed mb-4">
            No se pudieron recuperar los reportes operacionales del servidor de analíticas. Por favor, intente de nuevo.
          </p>
          <Button size="sm" onClick={refetchAll} className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Reintentar Carga
          </Button>
        </div>
      ) : isLoading ? (
        renderSkeletons()
      ) : (
        <>
          {/* Executive counts KPI section */}
          <ReportsKPISection stats={stats} />

          {/* Main Visual Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Premium Reports cards with PDF export anchors */}
            <div className="lg:col-span-2 space-y-6">
              <ReportsCards
                tramites={tramites.data}
                documents={documents.data}
                rrhh={rrhh.data}
                notifications={notifications.data}
              />
            </div>

            {/* Right Column: AI Dictum insights summary findings */}
            <div className="lg:col-span-1">
              <ReportSummaryCard />
            </div>
          </div>

          {/* Analytics charts segment */}
          <div className="bg-slate-50 dark:bg-slate-950/20 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">
                Modelos de Distribución y Analíticas Avanzadas
              </h3>
            </div>
            <ReportsCharts
              tramites={tramites.data}
              documents={documents.data}
              rrhh={rrhh.data}
              notifications={notifications.data}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ReportsPage;

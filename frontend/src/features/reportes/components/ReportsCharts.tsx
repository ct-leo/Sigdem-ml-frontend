import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type {
  TramitesReport,
  DocumentsReport,
  RRHHReport,
  NotificationsReport,
} from "../types/reports.types";
import { reportsMapper } from "../utils/reports.mapper";
import { BarChart3, PieChart as PieIcon } from "lucide-react";

interface ReportsChartsProps {
  tramites?: TramitesReport;
  documents?: DocumentsReport;
  rrhh?: RRHHReport;
  notifications?: NotificationsReport;
}

export const ReportsCharts: React.FC<ReportsChartsProps> = ({
  tramites,
  documents,
  rrhh,
  notifications,
}) => {
  // Map all datasets via mapper
  const tramitePieData = React.useMemo(() => reportsMapper.mapTramitesToPieData(tramites), [tramites]);
  const priorityBarData = React.useMemo(() => reportsMapper.mapTramitePrioritiesToBarData(tramites), [tramites]);
  const docPieData = React.useMemo(() => reportsMapper.mapDocumentsToPieData(documents), [documents]);
  const rrhhBarData = React.useMemo(() => reportsMapper.mapRRHHToBarData(rrhh), [rrhh]);
  const notifPieData = React.useMemo(() => reportsMapper.mapNotificationsToPieData(notifications), [notifications]);

  return (
    <div className="space-y-6 select-none">
      {/* Upper row: Tramites status and Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Status Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
            <PieIcon className="w-4.5 h-4.5 text-blue-600" />
            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Distribución por Estado de Trámite</h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tramitePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {tramitePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Priorities Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
            <BarChart3 className="w-4.5 h-4.5 text-amber-500" />
            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Trámites por Nivel de Prioridad</h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {priorityBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lower row: Documental OCR, RRHH recruitment and email notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie OCR Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
            <PieIcon className="w-4 h-4 text-emerald-500" />
            <h4 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider">Digitalización y OCR</h4>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={docPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {docPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 9 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar RRHH recruitment Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <h4 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider">Métricas de Convocatorias</h4>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rrhhBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {rrhhBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Email notifications Chart */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-3">
            <PieIcon className="w-4 h-4 text-rose-500" />
            <h4 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider">Bitácora de Despacho</h4>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={notifPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {notifPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 9 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportsCharts;

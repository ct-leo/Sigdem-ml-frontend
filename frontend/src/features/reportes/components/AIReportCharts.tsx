import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent } from "../../../components/ui/Card";
import type { AIReportData } from "../types/report.types";

interface AIReportChartsProps {
  data: AIReportData;
}

export const AIReportCharts: React.FC<AIReportChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
      {/* Confusion Matrix Visual Heatmap */}
      <Card className="border border-border-color shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Matriz de Confusión del Modelo (Random Forest)</h4>
            <p className="text-[11px] text-text-secondary">Comparativa de predicciones críticas vs. valores reales.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 max-w-sm mx-auto text-xs font-bold">
            <div className="col-span-1" />
            <div className="text-center text-[10px] text-text-secondary uppercase">Pred. Crítico</div>
            <div className="text-center text-[10px] text-text-secondary uppercase">Pred. Normal</div>

            <div className="flex items-center text-[10px] text-text-secondary uppercase pr-2 justify-end">Real Crítico</div>
            <div className="bg-[#749763]/25 border border-[#749763]/40 p-4 text-center rounded-lg text-dashboard-green text-sm flex flex-col justify-center">
              <span>85</span>
              <span className="text-[9px] font-black opacity-80 uppercase tracking-wide mt-0.5">Verdadero Pos.</span>
            </div>
            <div className="bg-red-50 border border-red-150 p-4 text-center rounded-lg text-danger text-sm flex flex-col justify-center">
              <span>5</span>
              <span className="text-[9px] font-black opacity-80 uppercase tracking-wide mt-0.5">Falso Neg.</span>
            </div>

            <div className="flex items-center text-[10px] text-text-secondary uppercase pr-2 justify-end">Real Normal</div>
            <div className="bg-red-50 border border-red-150 p-4 text-center rounded-lg text-danger text-sm flex flex-col justify-center">
              <span>8</span>
              <span className="text-[9px] font-black opacity-80 uppercase tracking-wide mt-0.5">Falso Pos.</span>
            </div>
            <div className="bg-[#749763]/25 border border-[#749763]/40 p-4 text-center rounded-lg text-dashboard-green text-sm flex flex-col justify-center">
              <span>402</span>
              <span className="text-[9px] font-black opacity-80 uppercase tracking-wide mt-0.5">Verdadero Neg.</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Distribution Bar */}
      <Card className="border border-border-color shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Distribución de Predicciones por Prioridad</h4>
            <p className="text-[11px] text-text-secondary">Clasificaciones del clasificador en expedientes entrantes.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.priorityDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#163B70" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Predictions Line */}
      <Card className="border border-border-color shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Evolución de Predicciones de IA</h4>
            <p className="text-[11px] text-text-secondary">Volumen total mensual de clasificaciones cognitivas.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyPredictions} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip />
                <Line type="monotone" dataKey="predicciones" stroke="#7DAA74" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Evolution of metrics */}
      <Card className="border border-border-color shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Evolución Histórica del Desempeño</h4>
            <p className="text-[11px] text-text-secondary">Evolución temporal de la precisión del modelo %.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.metricsEvolution} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#163B70" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="precision" stroke="#749763" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="recall" stroke="#D4AA45" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

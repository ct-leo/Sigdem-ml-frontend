import React from "react";
import type { MonthlyPredictionTrend } from "../types/ml.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface PriorityPredictionChartProps {
  data?: MonthlyPredictionTrend[];
  isLoading: boolean;
}

export const PriorityPredictionChart: React.FC<PriorityPredictionChartProps> = ({
  data,
  isLoading,
}) => {
  if (isLoading || !data) {
    return (
      <div className="bg-white rounded-xl border border-border-color p-6 animate-pulse h-[380px]">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-150 rounded"></div>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border border-border-color">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4.5 h-4.5 text-navy-blue" />
          Evolución Mensual de Predicciones
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-xs text-text-secondary mb-6 leading-normal">
          Historial y tendencia acumulada de trámites clasificados por rango de prioridades en el semestre operativo.
        </p>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorBaja" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7DAA74" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7DAA74" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMedia" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#163B70" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#163B70" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAlta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AA45" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#D4AA45" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCritica" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #111827",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-[11px] font-bold text-text-primary uppercase mr-2">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="Baja"
                stroke="#7DAA74"
                fillOpacity={1}
                fill="url(#colorBaja)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Media"
                stroke="#163B70"
                fillOpacity={1}
                fill="url(#colorMedia)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Alta"
                stroke="#D4AA45"
                fillOpacity={1}
                fill="url(#colorAlta)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Crítica"
                stroke="#DC2626"
                fillOpacity={1}
                fill="url(#colorCritica)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

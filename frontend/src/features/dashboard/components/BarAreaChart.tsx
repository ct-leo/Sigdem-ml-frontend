import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { useTramitesByPriority } from "../hooks/useTramitesByPriority";
import { dashboardMapper } from "../utils/dashboard.mapper";

export const BarAreaChart: React.FC = () => {
  const { data: priorityData, isLoading } = useTramitesByPriority();

  // Map backend priority response to BarChart compatible structure
  const chartData = React.useMemo(() => {
    return dashboardMapper.mapPriorityToBarData(priorityData);
  }, [priorityData]);

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col select-none">
        <CardHeader>
          <CardTitle>Trámites por Prioridad</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="h-full flex flex-col select-none">
        <CardHeader>
          <CardTitle>Trámites por Prioridad</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center min-h-[300px] text-xs font-bold uppercase text-slate-400">
          No hay datos de prioridades disponibles.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col select-none">
      <CardHeader>
        <CardTitle>Trámites por Prioridad</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="priority" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <Tooltip
              cursor={{ fill: "#F8FAFC" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

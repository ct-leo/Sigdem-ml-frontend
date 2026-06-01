import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { useTramitesByStatus } from "../hooks/useTramitesByStatus";
import { dashboardMapper } from "../utils/dashboard.mapper";

export const PieStatusChart: React.FC = () => {
  const { data: statusData, isLoading } = useTramitesByStatus();

  // Map backend status response to PieChart compatible structure
  const chartData = React.useMemo(() => {
    return dashboardMapper.mapStatusToPieData(statusData);
  }, [statusData]);

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col select-none">
        <CardHeader>
          <CardTitle>Estado de Trámites</CardTitle>
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
          <CardTitle>Estado de Trámites</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center min-h-[300px] text-xs font-bold uppercase text-slate-400">
          No hay trámites registrados.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col select-none">
      <CardHeader>
        <CardTitle>Estado de Trámites</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

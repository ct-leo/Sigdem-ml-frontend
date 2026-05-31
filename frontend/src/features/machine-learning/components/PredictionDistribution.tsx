import React from "react";
import type { PredictionDistribution as DistType } from "../types/ml.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { BarChart3 } from "lucide-react";

interface PredictionDistributionProps {
  data?: DistType[];
  isLoading: boolean;
}

export const PredictionDistribution: React.FC<PredictionDistributionProps> = ({
  data,
  isLoading,
}) => {
  if (isLoading || !data) {
    return (
      <div className="bg-white rounded-xl border border-border-color p-6 animate-pulse h-[360px]">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto"></div>
      </div>
    );
  }

  // Custom tooltips
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white p-3 rounded-lg border border-gray-800 text-xs shadow-lg">
          <p className="font-bold">{item.name}</p>
          <p className="mt-1">
            Volumen: <span className="font-mono text-golden-sand">{item.value} trámites</span>
          </p>
          <p>
            Proporción: <span className="font-mono">{item.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm border border-border-color h-full flex flex-col justify-between">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4.5 h-4.5 text-navy-blue" />
          Distribución de Prioridades
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <p className="text-xs text-text-secondary mb-4 leading-normal">
          Proporción de niveles de prioridad inferidos de forma automatizada por el Random Forest.
        </p>

        <div className="w-full flex-1 min-h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-[11px] font-bold text-text-primary uppercase mr-2">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

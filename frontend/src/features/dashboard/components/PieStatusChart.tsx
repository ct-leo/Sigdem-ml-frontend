import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";

const data = [
  { name: "Aprobados", value: 982, color: "#749763" }, // Dashboard Green
  { name: "Rechazados", value: 110, color: "#DC2626" }, // Danger
  { name: "En revisión", value: 85, color: "#D4AA45" }, // Golden Sand
  { name: "Pendientes", value: 71, color: "#163B70" }, // Navy Blue
];

export const PieStatusChart: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Estado de Trámites</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

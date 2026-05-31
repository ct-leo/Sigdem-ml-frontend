import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";

const data = [
  { area: "Recursos Humanos", tramites: 420 },
  { area: "Tesorería", tramites: 350 },
  { area: "Obras", tramites: 280 },
  { area: "Licencias", tramites: 210 },
  { area: "Administración", tramites: 150 },
];

export const BarAreaChart: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Trámites por Área</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="area" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Tooltip 
              cursor={{ fill: '#F8FAFC' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="tramites" fill="#163B70" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

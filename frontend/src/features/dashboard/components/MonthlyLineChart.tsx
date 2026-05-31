import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";

const data = [
  { name: "Ene", total: 120 },
  { name: "Feb", total: 150 },
  { name: "Mar", total: 180 },
  { name: "Abr", total: 220 },
  { name: "May", total: 200 },
  { name: "Jun", total: 250 },
  { name: "Jul", total: 310 },
  { name: "Ago", total: 290 },
  { name: "Sep", total: 340 },
  { name: "Oct", total: 380 },
  { name: "Nov", total: 420 },
  { name: "Dic", total: 450 },
];

export const MonthlyLineChart: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Evolución Mensual</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#D4AA45" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#D4AA45', strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

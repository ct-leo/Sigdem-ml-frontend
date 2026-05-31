import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";

const data = [
  { name: "Lun", carga: 120 },
  { name: "Mar", carga: 250 },
  { name: "Mie", carga: 180 },
  { name: "Jue", carga: 320 },
  { name: "Vie", carga: 410 },
  { name: "Sab", carga: 150 },
  { name: "Dom", carga: 80 },
];

export const WorkloadAreaChart: React.FC = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Carga Operativa</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCarga" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#749763" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#749763" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="carga" 
              stroke="#749763" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCarga)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

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
  AreaChart,
  Area,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent } from "../../../components/ui/Card";
import type { ProductivityReportData } from "../types/report.types";

interface ProductivityChartsProps {
  data: ProductivityReportData;
}

export const ProductivityCharts: React.FC<ProductivityChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* Monthly productivity line */}
      <Card className="border border-border-color shadow-sm lg:col-span-1">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Evolución de Procesos Completados</h4>
            <p className="text-[11px] text-text-secondary">Evolución mensual de expedientes finalizados.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyProductivity} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip />
                <Line type="monotone" dataKey="completados" stroke="#749763" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Operational Load Area */}
      <Card className="border border-border-color shadow-sm lg:col-span-1">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Expedientes Procesados por Hora</h4>
            <p className="text-[11px] text-text-secondary">Carga horaria y volumen de ingreso de documentos.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.operationalLoad} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="hour" tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip />
                <Area type="monotone" dataKey="expedientes" stroke="#163B70" fill="rgba(22, 59, 112, 0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Area Performance Bar */}
      <Card className="border border-border-color shadow-sm lg:col-span-1">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Eficiencia de Resolución por Área %</h4>
            <p className="text-[11px] text-text-secondary">Porcentaje promedio de metas operativas alcanzadas.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.areaPerformance} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 9, fontWeight: 700 }} />
                <Tooltip />
                <Bar dataKey="eficiencia" fill="#D4AA45" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

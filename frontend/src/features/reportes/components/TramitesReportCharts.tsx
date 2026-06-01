import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
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
import type { TramitesReportData } from "../types/report.types";

interface TramitesReportChartsProps {
  data: TramitesReportData;
}

const COLORS = ["#749763", "#163B70", "#DC2626"];

export const TramitesReportCharts: React.FC<TramitesReportChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
      {/* State Distribution Pie */}
      <Card className="border border-border-color shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Distribución de Trámites por Estado</h4>
            <p className="text-[11px] text-text-secondary">Proporción de expedientes en cada estado operacional.</p>
          </div>
          <div className="w-full h-64 mt-2 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data.stateDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={(props: any) => `${props.name} ${((props.percent || 0) * 100).toFixed(0)}%`}
                >
                  {data.stateDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Area Distribution Bar */}
      <Card className="border border-border-color shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Trámites Registrados por Área Municipal</h4>
            <p className="text-[11px] text-text-secondary">Volumen total de expedientes ingresados por oficinas.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.areaDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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

      {/* Monthly Evolution Line */}
      <Card className="border border-border-color shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Evolución Histórica de Registros</h4>
            <p className="text-[11px] text-text-secondary">Progreso mensual de trámites recibidos en el año fiscal.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyEvolution} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip />
                <Line type="monotone" dataKey="cantidad" stroke="#7DAA74" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Operational Load Area */}
      <Card className="border border-border-color shadow-sm">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Carga Operativa en Tiempo Real</h4>
            <p className="text-[11px] text-text-secondary">Fluctuación de la carga de trabajo en mesa de partes.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.operationalLoad} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip />
                <Area type="monotone" dataKey="carga" stroke="#163B70" fill="rgba(22, 59, 112, 0.1)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

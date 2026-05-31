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
  ResponsiveContainer
} from "recharts";
import { Card, CardContent } from "../../../components/ui/Card";
import type { RRHHReportData } from "../types/report.types";

interface RRHHReportChartsProps {
  data: RRHHReportData;
}

const COLORS = ["#163B70", "#7DAA74", "#D4AA45", "#DC2626"];

export const RRHHReportCharts: React.FC<RRHHReportChartsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none">
      {/* Vacancies by Area Bar */}
      <Card className="border border-border-color shadow-sm lg:col-span-1">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Convocatorias por Área Municipal</h4>
            <p className="text-[11px] text-text-secondary">Puestos requeridos clasificados por departamentos.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.areaDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 9, fontWeight: 700 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#7DAA74" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Status Pie */}
      <Card className="border border-border-color shadow-sm lg:col-span-1">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Fases de Candidatos (ATS)</h4>
            <p className="text-[11px] text-text-secondary">Proporción de postulantes en el embudo de selección.</p>
          </div>
          <div className="w-full h-64 mt-2 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data.candidateStateDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  label={(props: any) => `${props.name} ${((props.percent || 0) * 100).toFixed(0)}%`}
                >
                  {data.candidateStateDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Applications Line */}
      <Card className="border border-border-color shadow-sm lg:col-span-1">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-extrabold text-text-primary">Curriculums Recibidos por Mes</h4>
            <p className="text-[11px] text-text-secondary">Evolución mensual del ingreso y procesado de CVs.</p>
          </div>
          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthlyApplications} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
                <Tooltip />
                <Line type="monotone" dataKey="postulantes" stroke="#163B70" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

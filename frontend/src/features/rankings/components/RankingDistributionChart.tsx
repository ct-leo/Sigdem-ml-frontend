import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent } from "../../../components/ui/Card";
import { BrainCircuit } from "lucide-react";
import type { CandidateRanking } from "../types/ranking.types";

interface RankingDistributionChartProps {
  candidates: CandidateRanking[];
}

export const RankingDistributionChart: React.FC<RankingDistributionChartProps> = ({ candidates }) => {
  // Group candidates by Score IA brackets
  const brackets = [
    { name: "80-85 pts", count: 0, color: "#D4AA45" }, // Golden Sand
    { name: "86-90 pts", count: 0, color: "#7DAA74" }, // Municipal Green
    { name: "91-95 pts", count: 0, color: "#749763" }, // Dashboard Green
    { name: "96-100 pts", count: 0, color: "#163B70" }, // Navy Blue
  ];

  candidates.forEach((c) => {
    const score = c.scoreIA;
    if (score >= 96) {
      brackets[3].count += 1;
    } else if (score >= 91) {
      brackets[2].count += 1;
    } else if (score >= 86) {
      brackets[1].count += 1;
    } else if (score >= 80) {
      brackets[0].count += 1;
    }
  });

  return (
    <Card className="border border-border-color shadow-sm h-full">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5">
            <BrainCircuit className="w-4.5 h-4.5 text-navy-blue" />
            Distribución de Puntajes Evaluados por IA
          </h3>
          <p className="text-xs text-text-secondary">
            Proporción de candidatos agrupados por rangos de score de idoneidad.
          </p>
        </div>

        <div className="w-full h-64 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={brackets}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fontWeight: 700, fill: "#6B7280" }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fontWeight: 700, fill: "#6B7280" }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(22, 59, 112, 0.04)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-border-color p-3 rounded-lg shadow-md flex flex-col gap-1">
                        <span className="text-xs font-black text-navy-blue">{data.name}</span>
                        <span className="text-xs font-semibold text-text-primary">
                          Candidatos: <span className="font-extrabold text-navy-blue">{data.count}</span>
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                {brackets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

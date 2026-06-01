import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../components/ui/Card";
import { ArrowRight, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ReportCardProps {
  title: string;
  description: string;
  metricsCount: number;
  lastUpdate: string;
  icon: LucideIcon;
  path: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  title,
  description,
  metricsCount,
  lastUpdate,
  icon: Icon,
  path,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="border border-border-color rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow select-none h-full flex flex-col justify-between">
      <CardContent className="p-6 flex flex-col gap-4">
        {/* Header Icon & Title */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-extrabold text-text-primary text-base leading-snug">
              {title}
            </h4>
            <p className="text-xs text-text-secondary leading-normal mt-1 font-semibold">
              {description}
            </p>
          </div>
          <div className="p-3 bg-light-bg rounded-lg shrink-0">
            <Icon className="w-5 h-5 text-navy-blue" />
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-4 text-xs font-semibold mt-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Indicadores</span>
            <span className="text-text-primary">{metricsCount} métricas activas</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Actualización</span>
            <span className="text-text-primary flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-text-secondary" />
              {lastUpdate}
            </span>
          </div>
        </div>

        <hr className="border-border-color mt-2" />

        {/* Action Button */}
        <div className="flex justify-end mt-1">
          <button
            onClick={() => navigate(path)}
            className="text-xs font-extrabold text-navy-blue hover:text-[#23589b] flex items-center gap-1 group transition-colors"
          >
            Acceder al Panel
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

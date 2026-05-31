import React from "react";
import type { Job } from "../types/job.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Calendar, Hash, Layers, UserPlus, HelpCircle } from "lucide-react";
import dayjs from "dayjs";

interface JobInfoCardProps {
  job: Job;
}

export const JobInfoCard: React.FC<JobInfoCardProps> = ({ job }) => {
  return (
    <Card className="shadow-sm border border-border-color select-none">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4.5 h-4.5 text-navy-blue" />
          Descripción del Cargo
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-2.5">
            <Hash className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Código Convocatoria</p>
              <p className="text-xs font-semibold text-text-primary">{job.code}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <UserPlus className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Vacantes Disponibles</p>
              <p className="text-xs font-bold text-[#749763]">{job.vacancies} Plazas</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Fecha Publicación</p>
              <p className="text-xs font-semibold text-text-primary">
                {dayjs(job.publishedAt).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Fecha Cierre</p>
              <p className="text-xs font-semibold text-[#DC2626]">
                {dayjs(job.closedAt).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border-color/60 pt-4 space-y-2">
          <h4 className="text-xs font-bold text-text-primary uppercase flex items-center gap-1">
            <HelpCircle className="w-4 h-4 text-navy-blue" />
            Funciones y Responsabilidades:
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed bg-gray-50 p-4 rounded-lg border border-border-color/30">
            {job.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

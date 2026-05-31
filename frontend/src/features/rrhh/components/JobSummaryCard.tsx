import React from "react";
import type { Job } from "../types/job.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Sparkles, Users, Cpu, ShieldAlert } from "lucide-react";

interface JobSummaryCardProps {
  job: Job;
}

export const JobSummaryCard: React.FC<JobSummaryCardProps> = ({ job }) => {
  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Applications stat box */}
      <Card className="shadow-sm border border-border-color bg-gradient-to-br from-[#163B70] to-blue-900 text-white relative overflow-hidden">
        {/* Decorative blur vector */}
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full -mb-10 blur-lg pointer-events-none"></div>

        <CardContent className="p-6 relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/60 uppercase block tracking-wider">
              Postulaciones Recibidas
            </span>
            <h3 className="text-3xl font-black text-white">{job.totalApplicationsCount}</h3>
            <p className="text-[10px] text-golden-sand font-semibold">Candidatos para evaluación</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-golden-sand shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      {/* IA integration note card */}
      <Card className="shadow-sm border border-border-color overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
          <CardTitle className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-golden-sand animate-pulse" />
            Integración de Inteligencia Artificial
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-3 bg-[#7DAA74]/5 border border-[#7DAA74]/10 rounded-lg p-3 text-text-primary text-xs">
            <Cpu className="w-5 h-5 text-dashboard-green shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Módulo de Preselección NLP</p>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Próximamente el motor NLP analizará la formación y trayectoria del CV del candidato frente a
                los requerimientos del puesto de forma automática.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#D4AA45]/5 border border-[#D4AA45]/10 rounded-lg p-3 text-text-primary text-xs">
            <ShieldAlert className="w-5 h-5 text-golden-sand shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Ranking de Idoneidad</p>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                El modelo de Machine Learning generará un ranking de candidatos ponderando experiencia y
                certificaciones oficiales para el área de {job.area}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

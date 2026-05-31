import React from "react";
import type { Job } from "../types/job.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Award, ShieldCheck, CheckSquare, Clock, GraduationCap } from "lucide-react";

interface JobRequirementsCardProps {
  job: Job;
}

export const JobRequirementsCard: React.FC<JobRequirementsCardProps> = ({ job }) => {
  const { experienceYears, academicLevel, certifications, skills } = job.requirements;

  return (
    <Card className="shadow-sm border border-border-color select-none">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4.5 h-4.5 text-navy-blue" />
          Requisitos y Perfil Mínimo
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        {/* Experience & Academics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-border-color/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-navy-blue/5 rounded-lg text-navy-blue">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase">Experiencia Mínima</p>
              <p className="text-xs font-semibold text-text-primary">{experienceYears} Años en cargos similares</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-navy-blue/5 rounded-lg text-navy-blue">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase">Formación Académica</p>
              <p className="text-xs font-semibold text-text-primary">{academicLevel}</p>
            </div>
          </div>
        </div>

        {/* Required Skills */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text-primary uppercase flex items-center gap-1">
            <CheckSquare className="w-4 h-4 text-navy-blue" />
            Habilidades y Competencias Requeridas:
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-navy-blue/5 text-navy-blue text-[11px] font-semibold py-1 px-2.5 rounded-lg border border-navy-blue/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-text-primary uppercase flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#749763]" />
            Certificaciones Recomendadas:
          </h4>
          {certifications.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="bg-[#749763]/10 text-[#749763] text-[11px] font-semibold py-1 px-2.5 rounded-lg border border-[#749763]/20"
                >
                  {cert}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-secondary italic">No se requieren certificaciones especiales obligatorias.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

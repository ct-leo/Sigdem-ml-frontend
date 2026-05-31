import React from "react";
import type { Curriculum } from "../types/curriculum.types";
import { CurriculumStatusBadge } from "./CurriculumStatusBadge";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";

interface CandidateProfileHeaderProps {
  cv: Curriculum;
}

export const CandidateProfileHeader: React.FC<CandidateProfileHeaderProps> = ({ cv }) => {
  return (
    <div className="bg-white border border-border-color rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 select-none">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex items-center justify-center rounded-full border-2 border-navy-blue/20 bg-navy-blue/5 w-16 h-16 shrink-0 text-navy-blue shadow font-bold text-xl uppercase">
          {cv.candidateName.substring(0, 2)}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl font-black text-text-primary">{cv.candidateName}</h2>
            <CurriculumStatusBadge status={cv.status} />
          </div>
          
          <p className="text-xs text-navy-blue font-bold uppercase tracking-wide flex items-center gap-1 mt-1">
            <Briefcase className="w-3.5 h-3.5" />
            Postulante a: {cv.jobTitleAssociated} ({cv.codeAssociated})
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              {cv.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              {cv.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {cv.city}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0 self-start md:self-auto border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto">
        <span className="text-[10px] font-bold text-text-secondary uppercase">
          Compatibilidad del Perfil
        </span>
        <CompatibilityBadge score={cv.compatibilityPercentage} className="scale-110" />
      </div>
    </div>
  );
};

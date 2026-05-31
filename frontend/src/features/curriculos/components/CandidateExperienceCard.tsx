import React from "react";
import type { Curriculum } from "../types/curriculum.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Briefcase } from "lucide-react";

interface CandidateExperienceCardProps {
  cv: Curriculum;
}

export const CandidateExperienceCard: React.FC<CandidateExperienceCardProps> = ({ cv }) => {
  return (
    <Card className="shadow-sm border border-border-color select-none">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-4.5 h-4.5 text-navy-blue" />
          Trayectoria Profesional (OCR)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative border-l border-border-color pl-6 ml-3 space-y-6">
          {cv.experiences.map((exp, idx) => (
            <div key={idx} className="relative">
              {/* Timeline marker */}
              <span className="absolute -left-[31px] top-1.5 flex items-center justify-center rounded-full bg-navy-blue text-white w-4 h-4 border-2 border-white shadow"></span>

              <div>
                <span className="text-[10px] font-bold text-dashboard-green uppercase bg-[#749763]/10 px-2 py-0.5 rounded border border-[#749763]/20">
                  {exp.period}
                </span>
                <h4 className="text-sm font-black text-text-primary mt-1.5">{exp.position}</h4>
                <p className="text-xs text-navy-blue font-semibold">{exp.company}</p>
                <p className="text-xs text-text-secondary leading-relaxed mt-2 p-3 bg-gray-50 rounded-lg border border-border-color/30">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

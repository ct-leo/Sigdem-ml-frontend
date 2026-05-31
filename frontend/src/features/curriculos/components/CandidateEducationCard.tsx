import React from "react";
import type { Curriculum } from "../types/curriculum.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { GraduationCap, BookOpen } from "lucide-react";

interface CandidateEducationCardProps {
  cv: Curriculum;
}

export const CandidateEducationCard: React.FC<CandidateEducationCardProps> = ({ cv }) => {
  return (
    <Card className="shadow-sm border border-border-color select-none">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4.5 h-4.5 text-navy-blue" />
          Formación Académica
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {cv.educations.map((edu, idx) => (
          <div key={idx} className="flex gap-4 p-4 bg-gray-50/40 border border-border-color/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2.5 bg-navy-blue/5 rounded-lg text-navy-blue shrink-0 h-10 w-10 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase">
                {edu.academicLevel} • Egresado {edu.year}
              </span>
              <h4 className="text-sm font-black text-text-primary mt-0.5">{edu.career}</h4>
              <p className="text-xs text-text-secondary">{edu.institution}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

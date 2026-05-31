import React from "react";
import type { Curriculum } from "../types/curriculum.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Star } from "lucide-react";

interface CandidateSkillsCardProps {
  cv: Curriculum;
}

export const CandidateSkillsCard: React.FC<CandidateSkillsCardProps> = ({ cv }) => {
  return (
    <Card className="shadow-sm border border-border-color select-none">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Star className="w-4.5 h-4.5 text-navy-blue" />
          Habilidades Detectadas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2">
          {cv.skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-navy-blue/5 text-navy-blue text-[11px] font-semibold py-1.5 px-3 rounded-lg border border-navy-blue/10"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

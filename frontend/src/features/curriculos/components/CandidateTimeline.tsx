import React from "react";
import type { CurriculumTimelineStep } from "../types/curriculum.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { CalendarRange, CheckCircle2, Circle } from "lucide-react";

interface CandidateTimelineProps {
  timeline?: CurriculumTimelineStep[];
}

export const CandidateTimeline: React.FC<CandidateTimelineProps> = ({ timeline }) => {
  if (!timeline) return null;

  return (
    <Card className="shadow-sm border border-border-color select-none">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <CalendarRange className="w-4.5 h-4.5 text-navy-blue" />
          Fases del Proceso ATS
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative border-l border-border-color pl-6 ml-3 space-y-5">
          {timeline.map((step, idx) => {
            const Icon = step.completed ? CheckCircle2 : Circle;
            const colorClass = step.completed
              ? "text-[#749763] bg-[#749763]/10"
              : step.active
              ? "text-golden-sand bg-[#D4AA45]/10 animate-pulse border-golden-sand"
              : "text-text-secondary bg-gray-50";

            return (
              <div key={idx} className="relative flex justify-between items-center">
                {/* Timeline node */}
                <span className={`absolute -left-[32px] top-1 rounded-full p-0.5 border ${colorClass}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>

                <div>
                  <h4 className={`text-xs font-bold ${step.active ? "text-golden-sand" : "text-text-primary"}`}>
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-text-secondary font-medium mt-0.5">{step.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

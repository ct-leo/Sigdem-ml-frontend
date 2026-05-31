import React from "react";

interface CandidateSkillsListProps {
  skills: string[];
}

export const CandidateSkillsList: React.FC<CandidateSkillsListProps> = ({ skills }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-2 py-0.5 bg-light-bg border border-border-color text-text-primary rounded text-xs font-medium"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

import React from "react";
import type { Job } from "../types/job.types";
import { JobStatusBadge } from "./JobStatusBadge";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobDetailHeaderProps {
  job: Job;
}

export const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-color pb-5 select-none">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => navigate("/convocatorias")}
          variant="default"
          className="p-2 border border-border-color bg-white hover:bg-gray-50 text-text-primary rounded-lg shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-text-primary">{job.title}</h2>
            <JobStatusBadge status={job.status} />
          </div>
          <p className="text-xs text-text-secondary mt-1 uppercase font-bold tracking-wide">
            {job.code} • {job.area}
          </p>
        </div>
      </div>

      <Button
        onClick={() => navigate(`/convocatorias/${job.id}/editar`)}
        className="bg-navy-blue hover:bg-blue-800 text-white flex items-center gap-1.5"
      >
        <Edit className="w-4 h-4" />
        Editar Convocatoria
      </Button>
    </div>
  );
};

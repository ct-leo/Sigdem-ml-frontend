import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../hooks/useJob";
import { JobDetailHeader } from "../components/JobDetailHeader";
import { JobInfoCard } from "../components/JobInfoCard";
import { JobRequirementsCard } from "../components/JobRequirementsCard";
import { JobSummaryCard } from "../components/JobSummaryCard";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error } = useJob(id || "");

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-navy-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium text-sm">
          Cargando detalles de la convocatoria...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-border-color shadow-sm max-w-md mx-auto mt-12">
        <div className="w-16 h-16 rounded-full bg-red-50 text-danger flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-text-primary text-lg mb-2">
          Convocatoria No Encontrada
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          La convocatoria solicitada no existe o ha sido dada de baja del portal municipal.
        </p>
        <Button onClick={() => navigate("/convocatorias")} className="bg-navy-blue">
          Volver a Convocatorias
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      {/* Return Page Header */}
      <PageHeader
        title={job.title}
        description="Ficha técnica del proceso de selección de personal y requerimientos de perfil mínimo."
        actions={
          <Button
            onClick={() => navigate("/convocatorias")}
            variant="default"
            className="gap-2 border border-border-color bg-white hover:bg-gray-50 text-text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Convocatorias
          </Button>
        }
      />

      {/* Main Detail Header */}
      <JobDetailHeader job={job} />

      {/* Detail Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mt-2">
        {/* Info & Requirements (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-2 flex flex-col gap-6"
        >
          <JobInfoCard job={job} />
          <JobRequirementsCard job={job} />
        </motion.div>

        {/* Status, Applicants, and IA predictions (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <JobSummaryCard job={job} />
        </motion.div>
      </div>
    </div>
  );
};

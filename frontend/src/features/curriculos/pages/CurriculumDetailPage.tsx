import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCurriculum } from "../hooks/useCurriculum";
import { CandidateProfileHeader } from "../components/CandidateProfileHeader";
import { CandidateInfoCard } from "../components/CandidateInfoCard";
import { CandidateSkillsCard } from "../components/CandidateSkillsCard";
import { CandidateNLPInsights } from "../components/CandidateNLPInsights";
import { CandidateExperienceCard } from "../components/CandidateExperienceCard";
import { CandidateEducationCard } from "../components/CandidateEducationCard";
import { CandidateCertificationsCard } from "../components/CandidateCertificationsCard";
import { CandidateTimeline } from "../components/CandidateTimeline";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export const CurriculumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: cv, isLoading, error } = useCurriculum(id || "");

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-navy-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium text-sm">
          Cargando ficha de perfil profesional...
        </p>
      </div>
    );
  }

  if (error || !cv) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-border-color shadow-sm max-w-md mx-auto mt-12">
        <div className="w-16 h-16 rounded-full bg-red-50 text-danger flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-text-primary text-lg mb-2">
          Expediente No Encontrado
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          El currículo solicitado no existe en los servidores o ha sido reclasificado del portal de talento.
        </p>
        <Button onClick={() => navigate("/curriculos")} className="bg-navy-blue">
          Volver al Portal ATS
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      {/* Return Page Header */}
      <PageHeader
        title={cv.candidateName}
        description="Ficha del candidato estructurada, conteniendo análisis de compatibilidad por NLP y trayectoria profesional."
        actions={
          <Button
            onClick={() => navigate("/curriculos")}
            variant="default"
            className="gap-2 border border-border-color bg-white hover:bg-gray-50 text-text-primary animate-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Currículos
          </Button>
        }
      />

      {/* Candidate Profile Header Banner */}
      <CandidateProfileHeader cv={cv} />

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mt-2">
        {/* Left Side: General Profile Info & Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-1 flex flex-col gap-6"
        >
          <CandidateInfoCard cv={cv} />
          <CandidateSkillsCard cv={cv} />
        </motion.div>

        {/* Right Side: IA analysis and technical work experience */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="xl:col-span-2 flex flex-col gap-6"
        >
          <CandidateNLPInsights cv={cv} />
          <CandidateExperienceCard cv={cv} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="flex flex-col gap-6">
              <CandidateEducationCard cv={cv} />
              <CandidateCertificationsCard cv={cv} />
            </div>
            <div className="flex flex-col gap-6">
              <CandidateTimeline timeline={cv.timeline} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

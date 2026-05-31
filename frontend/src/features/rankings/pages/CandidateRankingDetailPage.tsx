import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateRankingStatus } from "../hooks/useRankings";
import { useCandidateRanking } from "../hooks/useCandidateRanking";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent } from "../../../components/ui/Card";
import { CandidateComparisonCard } from "../components/CandidateComparisonCard";
import { CandidateSkillsList } from "../components/CandidateSkillsList";
import { CurriculumStatusBadge } from "../../curriculos/components/CurriculumStatusBadge";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Shield,
  FileCheck,
  CheckCircle,
  Eye,
  UserCheck,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const CandidateRankingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: candidate, isLoading } = useCandidateRanking(id || "");
  const updateStatusMutation = useUpdateRankingStatus();

  const handleStatusChange = async (newStatus: "Preseleccionado" | "Aprobado" | "En Revisión" | "Descartado") => {
    if (!candidate) return;
    try {
      await updateStatusMutation.mutateAsync({ id: candidate.id, status: newStatus });
      toast.success(`Estado del candidato actualizado a ${newStatus}`);
    } catch {
      toast.error("Error al actualizar el estado del candidato");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xs font-semibold text-text-secondary select-none">
        Cargando ficha ejecutiva de talento...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 select-none">
        <p className="text-sm font-semibold text-text-secondary">Candidato no encontrado</p>
        <Button onClick={() => navigate("/rankings")} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Volver al Ranking
        </Button>
      </div>
    );
  }

  // Circular progress SVG values
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (candidate.scoreIA / 100) * circumference;

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate("/rankings")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
      </div>

      <PageHeader
        title={`Ficha de Talento: ${candidate.candidateName}`}
        description="Ficha ejecutiva con análisis de idoneidad, compatibilidad técnica, y comparación de perfil con IA."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: IA Score Gauge and Personal Info */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card className="border border-border-color shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center gap-6">
              {/* Circular Gauge */}
              <div className="relative flex flex-col items-center">
                <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                  <circle
                    stroke="#F1F5F9"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                  <motion.circle
                    stroke={candidate.scoreIA >= 90 ? "#749763" : candidate.scoreIA >= 80 ? "#D4AA45" : "#DC2626"}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-navy-blue leading-none">{candidate.scoreIA}</span>
                  <span className="text-[9px] uppercase font-bold text-text-secondary tracking-widest mt-1">Score IA</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <h3 className="text-lg font-black text-text-primary">{candidate.candidateName}</h3>
                <span className="text-xs text-navy-blue font-bold flex items-center justify-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  {candidate.position}
                </span>
                <span className="text-xs text-text-secondary font-semibold">{candidate.jobTitleAssociated}</span>
                <span className="text-[10px] text-text-secondary font-mono font-bold">{candidate.codeAssociated}</span>
              </div>

              <div className="scale-95">
                <CurriculumStatusBadge status={candidate.status as any} />
              </div>

              <hr className="w-full border-border-color" />

              {/* Personal details list */}
              <div className="flex flex-col gap-3.5 text-xs text-left w-full">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-navy-blue shrink-0" />
                  <span className="text-text-primary font-semibold truncate">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-navy-blue shrink-0" />
                  <span className="text-text-primary font-semibold">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-navy-blue shrink-0" />
                  <span className="text-text-primary font-semibold">{candidate.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-navy-blue shrink-0" />
                  <span className="text-text-primary font-semibold">
                    Registrado: {new Date(candidate.registrationDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="border border-border-color shadow-sm">
            <CardContent className="p-6 flex flex-col gap-4">
              <span className="text-xs font-black uppercase tracking-wider text-text-secondary">
                Acciones de Contratación
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleStatusChange("Aprobado")}
                  variant={candidate.status === "Aprobado" ? "default" : "outline"}
                  size="sm"
                  className="gap-1 py-2 font-bold"
                >
                  <CheckCircle className="w-4 h-4" /> Aprobar
                </Button>
                <Button
                  onClick={() => handleStatusChange("Preseleccionado")}
                  variant={candidate.status === "Preseleccionado" ? "default" : "outline"}
                  size="sm"
                  className="gap-1 py-2 font-bold"
                >
                  <UserCheck className="w-4 h-4" /> Preseleccionar
                </Button>
                <Button
                  onClick={() => handleStatusChange("En Revisión")}
                  variant={candidate.status === "En Revisión" ? "default" : "outline"}
                  size="sm"
                  className="gap-1 py-2 font-bold"
                >
                  <Eye className="w-4 h-4" /> Revisar
                </Button>
                <Button
                  onClick={() => handleStatusChange("Descartado")}
                  variant={candidate.status === "Descartado" ? "danger" : "outline"}
                  size="sm"
                  className="gap-1 py-2 font-bold text-danger hover:text-white"
                >
                  <XCircle className="w-4 h-4" /> Descartar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Comparative Analysis, Experience and Education details */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Direct Comparative Card */}
          <CandidateComparisonCard
            candidate={candidate}
            averageCompatibility={88}
            averageExperience={4}
          />

          {/* Professional Credentials Section */}
          <Card className="border border-border-color shadow-sm">
            <CardContent className="p-6 flex flex-col gap-5">
              <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5 border-b border-border-color pb-3">
                <Briefcase className="w-4.5 h-4.5 text-navy-blue" />
                Experiencia & Formación Académica
              </h3>

              <div className="flex flex-col gap-4">
                {/* Years Experience */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-light-bg rounded-lg shrink-0">
                    <Briefcase className="w-5 h-5 text-navy-blue" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-text-primary">Años de Trayectoria</span>
                    <span className="text-xs text-text-secondary">
                      Demuestra <span className="font-bold text-text-primary">{candidate.experienceYears} años</span> de experiencia profesional relevante para el cargo.
                    </span>
                  </div>
                </div>

                {/* Academic level */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-light-bg rounded-lg shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#7DAA74]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-text-primary">Nivel Académico Alcanzado</span>
                    <span className="text-xs text-text-secondary">{candidate.academicLevel}</span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-light-bg rounded-lg shrink-0">
                    <Award className="w-5 h-5 text-golden-sand" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-xs font-bold text-text-primary">Certificaciones Profesionales Detectadas</span>
                    {candidate.certifications.length > 0 ? (
                      <div className="flex flex-col gap-1 mt-1 text-xs text-text-secondary font-semibold">
                        {candidate.certifications.map((cert: string, index: number) => (
                          <div key={index} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-golden-sand rounded-full" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-text-secondary">No se han registrado certificaciones.</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Habilidades & Competencias Clave */}
          <Card className="border border-border-color shadow-sm">
            <CardContent className="p-6 flex flex-col gap-4">
              <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5 border-b border-border-color pb-3">
                <FileCheck className="w-4.5 h-4.5 text-navy-blue" />
                Matriz de Habilidades & Habilidades Clave
              </h3>
              <div className="mt-2">
                <CandidateSkillsList skills={candidate.skills} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

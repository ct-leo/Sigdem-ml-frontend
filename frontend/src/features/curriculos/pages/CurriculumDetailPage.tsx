import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Brain,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { CandidateProfileCard } from "../components/CandidateProfileCard";
import { CVViewer } from "../components/CVViewer";
import { CVNLPStatusBadge } from "../components/CVNLPStatusBadge";
import { useCV } from "../../cvs/hooks/useCV";
import { useDeleteCV } from "../../cvs/hooks/useDeleteCV";
import { useExtractCV } from "../../cvs/hooks/useExtractCV";
import { useJob } from "../../rrhh/hooks/useJob";
import { alerts } from "../../../utils/sweetalert";
import dayjs from "dayjs";

export const CurriculumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cvId = Number(id);

  const [extractedOpen, setExtractedOpen] = useState(false);

  const { data: cv, isLoading, error } = useCV(cvId);
  const { data: job } = useJob(cv?.job_id ?? 0);
  const deleteMutation = useDeleteCV();
  const extractMutation = useExtractCV();

  const handleDelete = async () => {
    if (!cv) return;
    const result = await alerts.confirmDelete(
      "¿Eliminar Currículo?",
      `¿Está seguro de eliminar el CV de "${cv.nombre_candidato}"? Esta acción es irreversible.`
    );
    if (!result.isConfirmed) return;
    deleteMutation.mutate(cvId, {
      onSuccess: () => navigate("/curriculos"),
    });
  };

  const handleExtract = async () => {
    if (!cv) return;
    const result = await alerts.confirmAction(
      "Extraer Texto",
      `¿Desea iniciar la extracción de texto del CV de "${cv.nombre_candidato}" mediante el motor NLP?`,
      "Extraer",
      "Cancelar"
    );
    if (!result.isConfirmed) return;
    extractMutation.mutate(cvId, {
      onSuccess: () => setExtractedOpen(true),
    });
  };

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-navy-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium text-sm">
          Cargando expediente del candidato...
        </p>
      </div>
    );
  }

  /* ── Error / not found ── */
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
          El currículo solicitado no existe o ha sido eliminado del portal ATS.
        </p>
        <Button onClick={() => navigate("/curriculos")} className="bg-navy-blue">
          Volver al Portal ATS
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      {/* Header */}
      <PageHeader
        title={cv.nombre_candidato}
        description="Expediente profesional del candidato registrado en el portal ATS municipal."
        actions={
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/curriculos")}
              variant="default"
              className="gap-2 border border-border-color bg-white hover:bg-gray-50 text-text-primary font-bold text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <Button
              onClick={handleExtract}
              disabled={extractMutation.isPending}
              className="gap-2 bg-[#749763] hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              {extractMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Brain className="w-4 h-4" />
              )}
              {extractMutation.isPending ? "Extrayendo..." : "Extraer Texto NLP"}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              <Trash2 className="w-4 h-4" />
              {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        }
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mt-2">
        {/* Left: Profile Card + Metadata */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-1 flex flex-col gap-5"
        >
          {/* Profile Card */}
          <CandidateProfileCard
            cv={cv}
            jobTitle={job ? `${job.titulo} (CONV-${job.id})` : undefined}
          />

          {/* Metadata Card */}
          <Card className="shadow-sm border border-border-color">
            <CardHeader className="bg-navy-blue text-white px-5 py-4">
              <CardTitle className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-golden-sand" />
                Información del Archivo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Nombre Original</p>
                <p className="text-xs font-semibold text-text-primary mt-0.5 break-all">{cv.nombre_original}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Tipo de Archivo</p>
                <p className="text-xs font-semibold text-text-primary mt-0.5">
                  {cv.nombre_original.split(".").pop()?.toUpperCase() ?? cv.tipo_archivo}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Fecha de Carga</p>
                <p className="text-xs font-semibold text-text-primary mt-0.5">
                  {dayjs(cv.fecha_subida).format("DD/MM/YYYY [a las] HH:mm")}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Estado NLP</p>
                <div className="mt-1.5">
                  <CVNLPStatusBadge status={cv.texto_procesado} />
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Convocatoria</p>
                <p className="text-xs font-bold text-navy-blue mt-0.5">CONV-{cv.job_id}</p>
                {job && (
                  <p className="text-[11px] text-text-secondary">{job.titulo}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: PDF Viewer + Extracted Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="xl:col-span-2 flex flex-col gap-5"
        >
          {/* PDF Viewer */}
          <CVViewer cv={cv} />

          {/* Extracted Text Panel */}
          <Card className="shadow-sm border border-border-color overflow-hidden">
            <button
              onClick={() => setExtractedOpen((o) => !o)}
              className="w-full flex items-center justify-between px-5 py-4 bg-gray-50/80 hover:bg-gray-100/60 transition-colors border-b border-border-color"
            >
              <div className="flex items-center gap-2">
                <Brain className="w-4.5 h-4.5 text-navy-blue" />
                <h3 className="text-sm font-black text-text-primary uppercase tracking-wider">
                  Extracción de Texto NLP
                </h3>
                <CVNLPStatusBadge status={cv.texto_procesado} showIcon={false} />
              </div>
              <div className="flex items-center gap-2">
                {cv.texto_procesado === "NO" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExtract();
                    }}
                    disabled={extractMutation.isPending}
                    className="flex items-center gap-1.5 text-xs font-bold text-navy-blue hover:text-blue-800 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${extractMutation.isPending ? "animate-spin" : ""}`} />
                    {extractMutation.isPending ? "Extrayendo..." : "Iniciar extracción"}
                  </button>
                )}
                {extractedOpen ? (
                  <ChevronUp className="w-4 h-4 text-text-secondary" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-secondary" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {extractedOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <CardContent className="p-5">
                    {cv.texto_extraido ? (
                      <pre className="text-xs text-text-secondary leading-relaxed whitespace-pre-wrap font-mono bg-gray-50 border border-border-color rounded-xl p-4 max-h-[400px] overflow-y-auto">
                        {cv.texto_extraido}
                      </pre>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                        <Brain className="w-10 h-10 text-text-secondary/30" />
                        <p className="text-sm font-semibold text-text-secondary">
                          Aún no se ha realizado la extracción de texto.
                        </p>
                        <p className="text-xs text-text-secondary max-w-xs">
                          Haz clic en "Extraer Texto NLP" para procesar el documento con el motor de lenguaje natural.
                        </p>
                        <Button
                          onClick={handleExtract}
                          disabled={extractMutation.isPending}
                          className="mt-2 bg-navy-blue text-white font-bold text-xs uppercase tracking-wider gap-2"
                        >
                          {extractMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Brain className="w-4 h-4" />
                          )}
                          Extraer ahora
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

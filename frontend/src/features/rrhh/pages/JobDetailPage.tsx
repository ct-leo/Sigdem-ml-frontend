import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../hooks/useJob";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { JobStatusBadge } from "../components/JobStatusBadge";
import { 
  Loader2, 
  AlertCircle, 
  ArrowLeft, 
  Trash2, 
  Edit, 
  Calendar, 
  Hash, 
  MapPin, 
  Briefcase, 
  HelpCircle,
  FileText,
  User,
  Award
} from "lucide-react";
import { motion } from "framer-motion";
import { alerts } from "../../../utils/sweetalert";
import dayjs from "dayjs";

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const jobId = Number(id);

  const { data: job, isLoading, error } = useJob(jobId);
  const deleteMutation = useDeleteJob();

  const handleDelete = async () => {
    const result = await alerts.confirmDelete(
      "¿Eliminar Convocatoria?",
      `¿Está seguro que desea eliminar permanentemente la convocatoria "${job?.titulo}"? Esta acción es irreversible.`
    );
    if (!result.isConfirmed) return;

    deleteMutation.mutate(jobId, {
      onSuccess: () => {
        navigate("/convocatorias");
      }
    });
  };

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
      <div className="w-full h-[50vh] flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-border-color shadow-sm max-w-md mx-auto mt-12 select-none">
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
      {/* Page Header */}
      <PageHeader
        title={job.titulo}
        description="Ficha técnica de la convocatoria laboral y especificaciones del puesto."
        actions={
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/convocatorias")}
              variant="default"
              className="gap-2 border border-border-color bg-white hover:bg-gray-50 text-text-primary font-bold text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <Button
              onClick={() => navigate(`/convocatorias/${job.id}/editar`)}
              className="gap-2 bg-navy-blue hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider"
            >
              <Edit className="w-4 h-4 text-golden-sand" />
              Editar
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              <Trash2 className="w-4 h-4 text-white" />
              {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        }
      />

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mt-2">
        {/* Left Columns - Info & Requirements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-2 flex flex-col gap-6"
        >
          {/* Card 1: Descripcion */}
          <Card className="shadow-sm border border-border-color">
            <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
              <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-navy-blue" />
                Descripción del Puesto
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-xs text-text-secondary leading-relaxed bg-gray-50 p-4 rounded-xl border border-border-color/30">
                {job.descripcion}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border-color/60 pt-4">
                <div className="flex items-start gap-2.5">
                  <Briefcase className="w-4 h-4 text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-secondary">Modalidad</p>
                    <p className="text-xs font-semibold text-text-primary">{job.modalidad}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-secondary">Ubicación / Sede</p>
                    <p className="text-xs font-semibold text-text-primary">{job.ubicacion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-secondary">Área Municipal</p>
                    <p className="text-xs font-semibold text-text-primary">{job.area}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-secondary">Creado por Funcionario</p>
                    <p className="text-xs font-semibold text-text-primary">Funcionario #{job.created_by_id}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Requisitos */}
          <Card className="shadow-sm border border-border-color">
            <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
              <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-navy-blue" />
                Perfil y Requisitos del Puesto
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose max-w-none text-xs text-text-secondary leading-relaxed whitespace-pre-line bg-gray-50/50 border border-border-color p-4 rounded-xl">
                {job.requisitos}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Status & Metadatos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <Card className="shadow-sm border border-border-color">
            <CardHeader className="bg-navy-blue text-white px-6 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-white">
                <Briefcase className="w-4.5 h-4.5 text-golden-sand animate-pulse" />
                Estado Convocatoria
              </CardTitle>
              <JobStatusBadge status={job.estado} />
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-2.5 border-b border-border-color/60 pb-3">
                <Hash className="w-4 h-4 text-text-secondary mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary">Código del Proceso</p>
                  <p className="text-xs font-semibold text-text-primary">CONV-{job.id}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-b border-border-color/60 pb-3">
                <Calendar className="w-4 h-4 text-text-secondary mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary">Fecha Publicación</p>
                  <p className="text-xs font-semibold text-text-primary">
                    {dayjs(job.fecha_creacion).format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-text-secondary mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary">Última Actualización</p>
                  <p className="text-xs font-semibold text-text-primary">
                    {dayjs(job.fecha_actualizacion).format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

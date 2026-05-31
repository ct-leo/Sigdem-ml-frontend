import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../hooks/useJob";
import { useUpdateJob } from "../hooks/useUpdateJob";
import { JobForm } from "../components/JobForm";
import type { JobFormData } from "../schemas/job.schema";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const EditJobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error } = useJob(id || "");
  const updateMutation = useUpdateJob();

  const handleFormSubmit = async (data: JobFormData) => {
    toast.promise(
      updateMutation.mutateAsync({
        id: id || "",
        ...data,
      }),
      {
        loading: "Actualizando convocatoria...",
        success: "Convocatoria actualizada con éxito",
        error: "Error al actualizar la convocatoria",
      }
    );
    try {
      await updateMutation.mutateAsync({
        id: id || "",
        ...data,
      });
      navigate(`/convocatorias/${id}`);
    } catch {
      // toast prints error
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-navy-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium text-sm">
          Cargando datos del puesto...
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
          La convocatoria solicitada para edición no existe en el sistema.
        </p>
        <Button onClick={() => navigate("/convocatorias")} className="bg-navy-blue">
          Volver a Convocatorias
        </Button>
      </div>
    );
  }

  // Prep default values matching JobFormData structure
  const formDefaults: Partial<JobFormData> = {
    title: job.title,
    area: job.area,
    description: job.description,
    vacancies: job.vacancies,
    experienceYears: job.requirements.experienceYears,
    academicLevel: job.requirements.academicLevel,
    certifications: job.requirements.certifications.join(", "),
    skills: job.requirements.skills.join(", "),
    publishedAt: job.publishedAt.substring(0, 10),
    closedAt: job.closedAt.substring(0, 10),
    status: job.status,
  };

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Editar Convocatoria"
        description={`Modifica los requerimientos y alcances del expediente de reclutamiento ${job.code}.`}
        actions={
          <Button
            onClick={() => navigate(`/convocatorias/${id}`)}
            variant="default"
            className="gap-2 border border-border-color bg-white hover:bg-gray-50 text-text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancelar y Volver
          </Button>
        }
      />

      <div className="max-w-4xl mx-auto w-full mt-2">
        <JobForm
          onSubmit={handleFormSubmit}
          defaultValues={formDefaults}
          isSubmitting={updateMutation.isPending}
        />
      </div>
    </div>
  );
};

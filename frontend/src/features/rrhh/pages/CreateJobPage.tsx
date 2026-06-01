import React from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { JobForm } from "../components/JobForm";
import { useCreateJob } from "../hooks/useCreateJob";
import type { JobFormData } from "../schemas/job.schema";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { alerts } from "../../../utils/sweetalert";

export const CreateJobPage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateJob();

  const handleFormSubmit = async (data: JobFormData) => {
    const result = await alerts.confirmAction(
      "Confirmar Convocatoria",
      "¿Desea registrar esta nueva convocatoria laboral?",
      "Registrar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    try {
      await createMutation.mutateAsync(data);
      await alerts.success("Convocatoria Creada", "La oferta de empleo ha sido registrada correctamente.");
      navigate("/convocatorias");
    } catch (err: any) {
      alerts.error("Error", err.message || "Error al registrar la convocatoria");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Nueva Convocatoria"
        description="Registra un nuevo proceso de reclutamiento y selección de personal en la municipalidad."
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

      <div className="max-w-4xl mx-auto w-full mt-2">
        <JobForm onSubmit={handleFormSubmit} isSubmitting={createMutation.isPending} />
      </div>
    </div>
  );
};

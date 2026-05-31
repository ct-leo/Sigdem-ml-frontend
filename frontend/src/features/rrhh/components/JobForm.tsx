import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, type JobFormData } from "../schemas/job.schema";
import { Button } from "../../../components/ui/Button";
import { Save, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobFormProps {
  onSubmit: (data: JobFormData) => void;
  defaultValues?: Partial<JobFormData>;
  isSubmitting: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  defaultValues,
  isSubmitting,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema) as any,
    defaultValues: {
      title: "",
      area: "Recursos Humanos",
      description: "",
      vacancies: 1,
      experienceYears: 2,
      academicLevel: "Bachiller",
      certifications: "",
      skills: "",
      publishedAt: new Date().toISOString().substring(0, 10),
      closedAt: "",
      status: "Borrador",
      ...defaultValues,
    },
  });

  const areas = [
    "Recursos Humanos",
    "Tesorería",
    "Administración",
    "Tecnologías de Información",
    "Obras",
    "Defensa Civil",
    "Fiscalización",
    "Secretaría General",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="bg-white border border-border-color rounded-xl p-6 shadow-sm space-y-6 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Título del Puesto <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("title")}
            placeholder="Ej. Especialista de Presupuesto y Finanzas"
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all"
          />
          {errors.title && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.title.message}</span>
          )}
        </div>

        {/* Area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Área Responsable <span className="text-danger">*</span>
          </label>
          <select
            {...register("area")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all cursor-pointer"
          >
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          {errors.area && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.area.message}</span>
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Estado Inicial <span className="text-danger">*</span>
          </label>
          <select
            {...register("status")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all cursor-pointer"
          >
            <option value="Borrador">Borrador</option>
            <option value="Activa">Activa</option>
            <option value="Pausada">Pausada</option>
            <option value="Cerrada">Cerrada</option>
            <option value="Finalizada">Finalizada</option>
          </select>
          {errors.status && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.status.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Descripción de Funciones <span className="text-danger">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Detalle de las responsabilidades, actividades del cargo y labores operativas..."
            className="w-full bg-white border border-border-color rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all resize-none"
          />
          {errors.description && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.description.message}</span>
          )}
        </div>

        {/* Vacancies */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Vacantes Disponibles <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("vacancies")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all"
          />
          {errors.vacancies && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.vacancies.message}</span>
          )}
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Experiencia Mínima (Años) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("experienceYears")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all"
          />
          {errors.experienceYears && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.experienceYears.message}</span>
          )}
        </div>

        {/* Academic Level */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Nivel Académico Mínimo <span className="text-danger">*</span>
          </label>
          <select
            {...register("academicLevel")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all cursor-pointer"
          >
            <option value="Secundaria Completa">Secundaria Completa</option>
            <option value="Técnico Egresado">Técnico Egresado</option>
            <option value="Técnico Titulado">Técnico Titulado</option>
            <option value="Bachiller Universitario">Bachiller Universitario</option>
            <option value="Titulado Universitario">Titulado Universitario</option>
            <option value="Magíster / Postgrado">Magíster / Postgrado</option>
          </select>
          {errors.academicLevel && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.academicLevel.message}</span>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Habilidades Requeridas <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("skills")}
            placeholder="Excel Avanzado, Redacción Técnica, Trabajo en Equipo"
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all"
          />
          <p className="text-[10px] text-text-secondary">Separadas por comas (,)</p>
          {errors.skills && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.skills.message}</span>
          )}
        </div>

        {/* Certifications */}
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Certificaciones Técnicas Recomendadas
          </label>
          <input
            type="text"
            {...register("certifications")}
            placeholder="Certificación OSCE, ITIL, SQL Server Certified, Curso de Tránsito"
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all"
          />
          <p className="text-[10px] text-text-secondary">Separadas por comas (,) • Opcional</p>
        </div>

        {/* Publication Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Fecha de Publicación <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            {...register("publishedAt")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all cursor-pointer"
          />
          {errors.publishedAt && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.publishedAt.message}</span>
          )}
        </div>

        {/* Closing Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Fecha de Cierre <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            {...register("closedAt")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all cursor-pointer"
          />
          {errors.closedAt && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.closedAt.message}</span>
          )}
        </div>
      </div>

      {/* Form Buttons */}
      <div className="border-t pt-5 flex items-center justify-end gap-3">
        <Button
          type="button"
          onClick={() => navigate("/convocatorias")}
          variant="default"
          className="border border-border-color bg-white text-text-primary hover:bg-gray-50 flex items-center gap-1.5"
        >
          <XCircle className="w-4 h-4" />
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-navy-blue hover:bg-blue-800 text-white flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Guardando..." : "Guardar Convocatoria"}
        </Button>
      </div>
    </form>
  );
};

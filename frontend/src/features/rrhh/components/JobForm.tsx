import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, type JobFormValues } from "../schemas/job.schema";
import { Button } from "../../../components/ui/Button";
import { Save, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  defaultValues?: Partial<JobFormValues>;
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
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema) as any,
    defaultValues: {
      titulo: "",
      descripcion: "",
      requisitos: "",
      area: "Recursos Humanos",
      modalidad: "Presencial",
      ubicacion: "Sede Principal",
      estado: "ABIERTA",
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
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-border-color rounded-xl p-6 shadow-sm space-y-6 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Titulo */}
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Título de Convocatoria <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("titulo")}
            placeholder="Ej. Técnico Administrativo de Mesa de Partes"
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all font-semibold text-text-primary"
          />
          {errors.titulo && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.titulo.message}</span>
          )}
        </div>

        {/* Area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Área Convocante <span className="text-danger">*</span>
          </label>
          <select
            {...register("area")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all cursor-pointer font-semibold text-text-primary"
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

        {/* Estado */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Estado de Convocatoria <span className="text-danger">*</span>
          </label>
          <select
            {...register("estado")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all cursor-pointer font-semibold text-text-primary"
          >
            <option value="ABIERTA">Abierta / Activa</option>
            <option value="PAUSADA">Temporalmente Pausada</option>
            <option value="CERRADA">Proceso Cerrado</option>
          </select>
          {errors.estado && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.estado.message}</span>
          )}
        </div>

        {/* Modalidad */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Modalidad de Trabajo <span className="text-danger">*</span>
          </label>
          <select
            {...register("modalidad")}
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all cursor-pointer font-semibold text-text-primary"
          >
            <option value="Presencial">Presencial</option>
            <option value="Remoto">Remoto</option>
            <option value="Híbrido">Híbrido</option>
          </select>
          {errors.modalidad && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.modalidad.message}</span>
          )}
        </div>

        {/* Ubicacion */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Ubicación / Sede <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("ubicacion")}
            placeholder="Ej. Sede Central Municipal"
            className="w-full bg-white border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all font-semibold text-text-primary"
          />
          {errors.ubicacion && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.ubicacion.message}</span>
          )}
        </div>

        {/* Descripcion */}
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Descripción de Funciones <span className="text-danger">*</span>
          </label>
          <textarea
            {...register("descripcion")}
            rows={4}
            placeholder="Detalle de las responsabilidades, actividades del cargo y labores operativas..."
            className="w-full bg-white border border-border-color rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all resize-none text-text-secondary font-semibold"
          />
          {errors.descripcion && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.descripcion.message}</span>
          )}
        </div>

        {/* Requisitos */}
        <div className="flex flex-col gap-1.5 col-span-2">
          <label className="text-xs font-bold text-text-primary uppercase tracking-wide">
            Requisitos Mínimos del Puesto <span className="text-danger">*</span>
          </label>
          <textarea
            {...register("requisitos")}
            rows={4}
            placeholder="Ej. Bachiller en Derecho, 2 años de experiencia previa en sector público, conocimientos en redacción..."
            className="w-full bg-white border border-border-color rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all resize-none text-text-secondary font-semibold"
          />
          {errors.requisitos && (
            <span className="text-xs text-danger font-medium mt-0.5">{errors.requisitos.message}</span>
          )}
        </div>
      </div>

      {/* Form Buttons */}
      <div className="border-t pt-5 flex items-center justify-end gap-3">
        <Button
          type="button"
          onClick={() => navigate("/convocatorias")}
          variant="default"
          className="border border-border-color bg-white text-text-primary hover:bg-gray-50 flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider"
        >
          <XCircle className="w-4 h-4" />
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-navy-blue hover:bg-blue-800 text-white flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Guardando..." : "Guardar Convocatoria"}
        </Button>
      </div>
    </form>
  );
};

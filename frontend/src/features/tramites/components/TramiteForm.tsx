import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newTramiteSchema } from "../schemas/tramite.schema";
import type { NewTramiteFormValues } from "../schemas/tramite.schema";
import { Button } from "../../../components/ui/Button";
import { TramiteDropzone } from "./TramiteDropzone";
import { useCreateTramite } from "../hooks/useCreateTramite";
import { useNavigate } from "react-router-dom";

export const TramiteForm: React.FC = () => {
  const { mutate, isPending } = useCreateTramite();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTramiteFormValues>({
    resolver: zodResolver(newTramiteSchema),
    defaultValues: {
      type: "",
      description: "",
      applicantEmail: "",
      priority: "Media",
      responsibleArea: "",
      observations: "",
      files: [],
    },
  });

  const onSubmit = (data: NewTramiteFormValues) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/tramites");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-border-color shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-text-primary border-b border-border-color pb-3">
          Información Principal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Tipo de Trámite <span className="text-danger">*</span></label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-full p-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                    errors.type ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
                  }`}
                >
                  <option value="">Selecciona un tipo...</option>
                  <option value="Licencia Comercial">Licencia Comercial</option>
                  <option value="Permiso de Construcción">Permiso de Construcción</option>
                  <option value="Reclamo">Reclamo</option>
                  <option value="Solicitud General">Solicitud General</option>
                  <option value="Certificado">Certificado</option>
                </select>
              )}
            />
            {errors.type && <p className="text-xs text-danger mt-1">{errors.type.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Prioridad <span className="text-danger">*</span></label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-full p-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                    errors.priority ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
                  }`}
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
              )}
            />
            {errors.priority && <p className="text-xs text-danger mt-1">{errors.priority.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Correo del Solicitante <span className="text-danger">*</span></label>
            <Controller
              name="applicantEmail"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className={`w-full p-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                    errors.applicantEmail ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
                  }`}
                />
              )}
            />
            {errors.applicantEmail && <p className="text-xs text-danger mt-1">{errors.applicantEmail.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Área Responsable <span className="text-danger">*</span></label>
            <Controller
              name="responsibleArea"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-full p-2.5 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                    errors.responsibleArea ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
                  }`}
                >
                  <option value="">Selecciona un área...</option>
                  <option value="Desarrollo Económico">Desarrollo Económico</option>
                  <option value="Obras Privadas">Obras Privadas</option>
                  <option value="Planeamiento Urbano">Planeamiento Urbano</option>
                  <option value="Seguridad Ciudadana">Seguridad Ciudadana</option>
                  <option value="Mesa de Partes">Mesa de Partes</option>
                </select>
              )}
            />
            {errors.responsibleArea && <p className="text-xs text-danger mt-1">{errors.responsibleArea.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Descripción del Trámite <span className="text-danger">*</span></label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                placeholder="Detalla el motivo de la solicitud..."
                className={`w-full p-3 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                  errors.description ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
                }`}
              />
            )}
          />
          {errors.description && <p className="text-xs text-danger mt-1">{errors.description.message}</p>}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-border-color shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-text-primary border-b border-border-color pb-3">
          Documentos Adjuntos
        </h3>
        
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <TramiteDropzone 
              value={field.value || []} 
              onChange={field.onChange} 
              error={errors.files?.message} 
            />
          )}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={() => navigate("/tramites")}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isPending}>
          Registrar Expediente
        </Button>
      </div>
    </form>
  );
};

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newTramiteSchema } from "../schemas/tramite.schema";
import type { NewTramiteFormValues } from "../schemas/tramite.schema";
import { Button } from "../../../components/ui/Button";
import { useCreateTramite } from "../hooks/useCreateTramite";
import { useNavigate } from "react-router-dom";
import { alerts } from "../../../utils/sweetalert";
import { User, Mail, Briefcase, FileText } from "lucide-react";

export const TramiteForm: React.FC = () => {
  const { mutateAsync, isPending } = useCreateTramite();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTramiteFormValues>({
    resolver: zodResolver(newTramiteSchema),
    defaultValues: {
      tipo_tramite: "",
      descripcion: "",
      correo_solicitante: "",
      area_responsable: "",
    },
  });

  const onSubmit = async (data: NewTramiteFormValues) => {
    const result = await alerts.confirmAction(
      "Registrar Expediente",
      "¿Desea crear un nuevo expediente de trámite?",
      "Registrar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    try {
      await mutateAsync(data);
      await alerts.success("Trámite Registrado", "El expediente ha sido registrado exitosamente.");
      navigate("/tramites");
    } catch {
      // Error handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 select-none">
      <div className="bg-white p-6 rounded-xl border border-border-color shadow-sm space-y-6">
        <h3 className="text-sm font-extrabold text-text-primary border-b border-border-color pb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-navy-blue" />
          Información Principal del Expediente
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tipo de Trámite */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-primary flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-navy-blue" />
              Tipo de Trámite <span className="text-danger">*</span>
            </label>
            <Controller
              name="tipo_tramite"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-full p-2.5 rounded-lg border text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                    errors.tipo_tramite ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
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
            {errors.tipo_tramite && <p className="text-[10px] text-danger font-bold mt-1">{errors.tipo_tramite.message}</p>}
          </div>

          {/* Correo del Solicitante */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-primary flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-navy-blue" />
              Correo del Solicitante <span className="text-danger">*</span>
            </label>
            <Controller
              name="correo_solicitante"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className={`w-full p-2.5 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                    errors.correo_solicitante ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
                  }`}
                />
              )}
            />
            {errors.correo_solicitante && <p className="text-[10px] text-danger font-bold mt-1">{errors.correo_solicitante.message}</p>}
          </div>

          {/* Área Responsable */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-primary flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-navy-blue" />
              Área Responsable <span className="text-danger">*</span>
            </label>
            <Controller
              name="area_responsable"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-full p-2.5 rounded-lg border text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                    errors.area_responsable ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
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
            {errors.area_responsable && <p className="text-[10px] text-danger font-bold mt-1">{errors.area_responsable.message}</p>}
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-primary flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-navy-blue" />
            Descripción del Trámite <span className="text-danger">*</span>
          </label>
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                placeholder="Detalla el motivo de la solicitud..."
                className={`w-full p-3 rounded-lg border text-xs font-semibold resize-none focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all ${
                  errors.descripcion ? 'border-danger focus:border-danger' : 'border-border-color hover:border-gray-400 focus:border-navy-blue'
                }`}
              />
            )}
          />
          {errors.descripcion && <p className="text-[10px] text-danger font-bold mt-1">{errors.descripcion.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/tramites")} 
          className="border border-border-color hover:bg-gray-50 text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          isLoading={isPending}
          className="bg-navy-blue hover:bg-navy-blue/90 text-white font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm"
        >
          Registrar Expediente
        </Button>
      </div>
    </form>
  );
};

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { useTramite } from "../hooks/useTramite";
import { useUpdateTramite } from "../hooks/useUpdateTramite";
import { useAssignAnalyst } from "../hooks/useAssignAnalyst";
import { useUsers } from "../../usuarios/hooks/useUsers";
import { ArrowLeft, Loader2, AlertCircle, Save, UserCheck, FileText } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTramiteSchema } from "../schemas/tramite.schema";
import type { EditTramiteFormValues } from "../schemas/tramite.schema";
import { alerts } from "../../../utils/sweetalert";
import type { TramitePriority } from "../types/tramite.types";

export const EditTramitePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tramiteIdNum = Number(id);

  const { data: tramite, isLoading: isLoadingTramite, error } = useTramite(tramiteIdNum);
  const updateMutation = useUpdateTramite();
  const assignMutation = useAssignAnalyst();
  const { data: users, isLoading: isLoadingUsers } = useUsers();

  const [assigningComment, setAssigningComment] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<EditTramiteFormValues>({
    resolver: zodResolver(editTramiteSchema),
    defaultValues: {
      tipo_tramite: "",
      descripcion: "",
      correo_solicitante: "",
      area_responsable: "",
      prioridad: "MEDIA",
      analista_id: null,
    },
  });

  // Load values into form when tramite is fetched
  useEffect(() => {
    if (tramite) {
      setValue("tipo_tramite", tramite.tipo_tramite);
      setValue("descripcion", tramite.descripcion);
      setValue("correo_solicitante", tramite.correo_solicitante);
      setValue("area_responsable", tramite.area_responsable);
      setValue("prioridad", tramite.prioridad);
      setValue("analista_id", tramite.analista_id);
    }
  }, [tramite, setValue]);

  if (isLoadingTramite) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center select-none">
        <Loader2 className="w-10 h-10 text-navy-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium text-xs">Cargando expediente...</p>
      </div>
    );
  }

  if (error || !tramite) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-border-color shadow-sm max-w-md mx-auto mt-12 select-none">
        <div className="w-16 h-16 rounded-full bg-red-50 text-danger flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="font-extrabold text-text-primary text-sm mb-2">Expediente No Encontrado</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-6">El expediente solicitado no existe en el sistema.</p>
        <Button onClick={() => navigate("/tramites")} className="bg-navy-blue font-black text-xs px-5 py-2.5 rounded-xl">
          Volver a Trámites
        </Button>
      </div>
    );
  }

  // Filter only Analysts
  const analistas = users?.filter((u) => u.role === "ANALISTA") || [];

  const onSave = async (data: EditTramiteFormValues) => {
    const result = await alerts.confirmAction(
      "Guardar Cambios",
      "¿Desea guardar los cambios en esta convocatoria?",
      "Guardar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    try {
      // 1. Update basic information
      await updateMutation.mutateAsync({
        id: tramiteIdNum,
        data: {
          tipo_tramite: data.tipo_tramite,
          descripcion: data.descripcion,
          area_responsable: data.area_responsable,
          correo_solicitante: data.correo_solicitante,
          prioridad: data.prioridad as TramitePriority,
        },
      });

      // 2. Assign analyst if it changed
      if (data.analista_id !== tramite.analista_id) {
        await assignMutation.mutateAsync({
          id: tramiteIdNum,
          data: {
            analista_id: Number(data.analista_id),
            comentario: assigningComment || "Reasignación de analista desde panel de edición.",
          },
        });
      }

      await alerts.success("Expediente Actualizado", "Los cambios han sido guardados correctamente.");
      navigate(`/tramites/${tramiteIdNum}`);
    } catch {
      // Handled in hooks
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 max-w-5xl mx-auto w-full select-none">
      <div 
        className="flex items-center gap-2 text-xs font-black text-text-secondary hover:text-navy-blue cursor-pointer transition-colors w-fit" 
        onClick={() => navigate(`/tramites/${tramiteIdNum}`)}
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Detalle
      </div>

      <PageHeader 
        title={`Editar Expediente: ${tramite.codigo}`}
        description="Actualiza la información técnica, prioridad o asigna un analista responsable."
      />

      <form onSubmit={handleSubmit(onSave)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core details card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-border-color shadow-sm space-y-6">
            <h3 className="text-xs font-extrabold text-text-primary border-b border-border-color pb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-navy-blue" />
              Datos del Expediente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Trámite */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-primary flex items-center gap-1.5">Tipo de Trámite *</label>
                <Controller
                  name="tipo_tramite"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                    >
                      <option value="Licencia Comercial">Licencia Comercial</option>
                      <option value="Permiso de Construcción">Permiso de Construcción</option>
                      <option value="Reclamo">Reclamo</option>
                      <option value="Solicitud General">Solicitud General</option>
                      <option value="Certificado">Certificado</option>
                    </select>
                  )}
                />
              </div>

              {/* Correo */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-primary flex items-center gap-1.5">Correo Solicitante *</label>
                <Controller
                  name="correo_solicitante"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                    />
                  )}
                />
              </div>

              {/* Área */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-primary flex items-center gap-1.5">Área Responsable *</label>
                <Controller
                  name="area_responsable"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                    >
                      <option value="Desarrollo Económico">Desarrollo Económico</option>
                      <option value="Obras Privadas">Obras Privadas</option>
                      <option value="Planeamiento Urbano">Planeamiento Urbano</option>
                      <option value="Seguridad Ciudadana">Seguridad Ciudadana</option>
                      <option value="Mesa de Partes">Mesa de Partes</option>
                    </select>
                  )}
                />
              </div>

              {/* Prioridad */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-primary flex items-center gap-1.5">Prioridad *</label>
                <Controller
                  name="prioridad"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                    >
                      <option value="BAJA">Baja</option>
                      <option value="MEDIA">Media</option>
                      <option value="ALTA">Alta</option>
                      <option value="CRITICA">Crítica</option>
                    </select>
                  )}
                />
              </div>
            </div>

            {/* Descripcion */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-primary">Descripción *</label>
              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full p-3 border border-border-color rounded-lg text-xs font-semibold resize-none focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Side Panel: Assignment */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-border-color shadow-sm space-y-5">
            <h3 className="text-xs font-extrabold text-text-primary border-b border-border-color pb-3 flex items-center gap-2">
              <UserCheck className="w-4.5 h-4.5 text-navy-blue" />
              Asignación de Analista (RBAC)
            </h3>

            {isLoadingUsers ? (
              <div className="flex justify-center p-4">
                <Loader2 className="w-6 h-6 text-navy-blue animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-primary">Analista Responsable</label>
                  <Controller
                    name="analista_id"
                    control={control}
                    render={({ field }) => (
                      <select
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                        className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                      >
                        <option value="">Sin Asignar</option>
                        {analistas.map((analista) => (
                          <option key={analista.id} value={analista.id}>
                            {analista.fullName} ({analista.email})
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-primary">Comentario de Asignación</label>
                  <textarea
                    value={assigningComment}
                    onChange={(e) => setAssigningComment(e.target.value)}
                    placeholder="Escribe el motivo del cambio o instrucciones específicas para el analista..."
                    rows={3}
                    className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold resize-none focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              type="submit" 
              isLoading={updateMutation.isPending || assignMutation.isPending}
              className="w-full bg-navy-blue hover:bg-navy-blue/90 text-white font-black text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Guardar Cambios
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(`/tramites/${tramiteIdNum}`)}
              className="w-full border border-border-color hover:bg-gray-50 text-xs font-bold py-3 rounded-xl transition-all"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

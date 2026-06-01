import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTramite } from "../hooks/useTramite";
import { useTramiteHistory } from "../hooks/useTramiteHistory";
import { useChangeStatus } from "../hooks/useChangeStatus";
import { useAssignAnalyst } from "../hooks/useAssignAnalyst";
import { useUsers } from "../../usuarios/hooks/useUsers";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, Edit, CheckCircle, UserCheck, Loader2, AlertCircle, X, Mail } from "lucide-react";
import { TramiteInfoCard } from "../components/TramiteInfoCard";
import { TramiteHistoryCard } from "../components/TramiteHistoryCard";
import { useNotificationsByTramite } from "../../notifications/hooks/useNotificationsByTramite";
import { notificationMapper } from "../../notifications/utils/notification.mapper";
import { motion, AnimatePresence } from "framer-motion";
import { alerts } from "../../../utils/sweetalert";
import type { TramiteStatus } from "../types/tramite.types";

export const TramiteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tramiteIdNum = Number(id);

  const { data: tramite, isLoading: isLoadingTramite, error } = useTramite(tramiteIdNum);
  const { data: history } = useTramiteHistory(tramiteIdNum);
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const [detailTab, setDetailTab] = useState<"info" | "notifications">("info");
  const { data: notifications } = useNotificationsByTramite(tramiteIdNum);

  const changeStatusMutation = useChangeStatus();
  const assignAnalystMutation = useAssignAnalyst();

  // Modals Local State
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Status Form State
  const [selectedStatus, setSelectedStatus] = useState<TramiteStatus | "">("");
  const [statusComment, setStatusComment] = useState("");

  // Assign Form State
  const [selectedAnalystId, setSelectedAnalystId] = useState<number | "">("");
  const [assignComment, setAssignComment] = useState("");

  if (isLoadingTramite) {
    return (
      <div className="flex h-[60vh] items-center justify-center select-none">
        <div className="text-center flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-navy-blue animate-spin mb-4" />
          <p className="text-text-secondary text-xs font-semibold">Cargando expediente...</p>
        </div>
      </div>
    );
  }

  if (error || !tramite) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] select-none">
        <AlertCircle className="w-12 h-12 text-danger mb-4" />
        <h2 className="text-sm font-black text-text-primary mb-2">Expediente no encontrado</h2>
        <p className="text-xs text-text-secondary mb-6">El trámite solicitado no existe o ha sido removido del sistema.</p>
        <Button onClick={() => navigate("/tramites")} className="bg-navy-blue font-black text-xs px-5 py-2.5 rounded-xl">
          Volver a Trámites
        </Button>
      </div>
    );
  }

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;

    const result = await alerts.confirmAction(
      "Cambiar Estado",
      `¿Desea cambiar el estado a ${selectedStatus}?`,
      "Confirmar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    try {
      await changeStatusMutation.mutateAsync({
        id: tramiteIdNum,
        data: {
          estado: selectedStatus,
          comentario: statusComment || `Cambio de estado manual a ${selectedStatus}.`,
        },
      });
      setShowStatusModal(false);
      setSelectedStatus("");
      setStatusComment("");
      await alerts.success("Estado Actualizado", "El estado del trámite ha sido actualizado correctamente.");
    } catch {
      // Handled in hook
    }
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnalystId) return;

    const analyst = users?.find((u) => Number(u.id) === Number(selectedAnalystId));
    const result = await alerts.confirmAction(
      "Asignar Analista",
      `¿Desea asignar a ${analyst?.fullName || "este analista"} a este trámite?`,
      "Asignar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    try {
      await assignAnalystMutation.mutateAsync({
        id: tramiteIdNum,
        data: {
          analista_id: Number(selectedAnalystId),
          comentario: assignComment || "Asignación de analista responsable.",
        },
      });
      setShowAssignModal(false);
      setSelectedAnalystId("");
      setAssignComment("");
      await alerts.success("Analista Asignado", "Se ha asignado el analista responsable.");
    } catch {
      // Handled in hook
    }
  };

  const analistas = users?.filter((u) => u.role === "ANALISTA") || [];

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <div 
        className="flex items-center gap-2 text-xs font-black text-text-secondary mb-2 hover:text-navy-blue cursor-pointer transition-colors w-fit" 
        onClick={() => navigate("/tramites")}
      >
        <ArrowLeft className="w-4 h-4" /> Volver a la lista
      </div>

      <PageHeader 
        title={`Expediente: ${tramite.codigo}`}
        description={tramite.descripcion}
        actions={
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAssignModal(true)} 
              className="gap-2 border border-border-color hover:bg-gray-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              <UserCheck className="w-4 h-4 text-navy-blue" />
              Asignar Analista
            </Button>
            <Button 
              onClick={() => setShowStatusModal(true)} 
              className="gap-2 bg-municipal-green text-white hover:bg-municipal-green/90 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Avanzar Flujo (BPM)
            </Button>
            <Button 
              onClick={() => navigate(`/tramites/${tramiteIdNum}/editar`)}
              className="gap-2 bg-navy-blue text-white hover:bg-navy-blue/90 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <Edit className="w-4 h-4" />
              Editar Detalles
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-2 space-y-6"
        >
          {/* Tab selector */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setDetailTab("info")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all leading-none ${detailTab === "info" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
            >
              Información General
            </button>
            <button
              onClick={() => setDetailTab("notifications")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all leading-none ${detailTab === "notifications" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
            >
              <Mail className="w-3.5 h-3.5" />
              Notificaciones ({notifications?.length || 0})
            </button>
          </div>

          {detailTab === "info" ? (
            <TramiteInfoCard tramite={tramite} />
          ) : (
            /* Communications log timeline */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">Historial de Comunicaciones</h3>
              {notifications?.length === 0 ? (
                <div className="py-8 text-center text-xs font-semibold text-slate-400">
                  No se registran correos formales enviados para este expediente municipal.
                </div>
              ) : (
                <div className="relative border-l border-slate-200 dark:border-slate-800 pl-4 ml-2 space-y-5 py-2">
                  {notifications?.map((notif) => {
                    const statusLabel = notificationMapper.getStatusLabel(notif.estado);
                    const colorClass = notificationMapper.getStatusColorClass(notif.estado);
                    return (
                      <div key={notif.id} className="relative group">
                        {/* Dot indicator */}
                        <div className="absolute w-3 h-3 bg-blue-600 dark:bg-blue-500 rounded-full -left-[22px] top-1 border border-white dark:border-slate-900 shadow-sm" />
                        <div className="flex justify-between items-start gap-4 flex-wrap">
                          <div>
                            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase">
                              {notif.asunto}
                            </h4>
                            <p className="text-2xs text-slate-400 font-semibold mt-0.5">
                              Destinatario: {notif.destinatario}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-4xs font-extrabold uppercase border ${colorClass}`}>
                              {statusLabel}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">
                              {notificationMapper.formatTimelineDate(notif.fecha_creacion)}
                            </span>
                          </div>
                        </div>
                        <p className="text-[11.5px] font-semibold leading-relaxed text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 mt-2 italic">
                          "{notif.mensaje}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="xl:col-span-1"
        >
          <TramiteHistoryCard history={history || []} />
        </motion.div>
      </div>

      {/* MODAL 1: CHANGE STATUS (BPM FLOW) */}
      <AnimatePresence>
        {showStatusModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-border-color shadow-2xl p-6 max-w-md w-full relative"
            >
              <button 
                onClick={() => setShowStatusModal(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-sm font-black text-text-primary flex items-center gap-2 border-b border-border-color pb-3">
                <CheckCircle className="w-4.5 h-4.5 text-navy-blue" />
                Avanzar Flujo de Expediente (BPM)
              </h3>

              <form onSubmit={handleStatusSubmit} className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-primary">Siguiente Estado de Transición</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as TramiteStatus)}
                    className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                    required
                  >
                    <option value="">Seleccione un estado...</option>
                    <option value="REGISTRADO">REGISTRADO</option>
                    <option value="EN_REVISION">EN REVISIÓN</option>
                    <option value="OBSERVADO">OBSERVADO</option>
                    <option value="APROBADO">APROBADO</option>
                    <option value="RECHAZADO">RECHAZADO</option>
                    <option value="FINALIZADO">FINALIZADO</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-primary">Comentario de Transición</label>
                  <textarea
                    value={statusComment}
                    onChange={(e) => setStatusComment(e.target.value)}
                    placeholder="Escribe el motivo del cambio o hallazgos analíticos..."
                    rows={4}
                    className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold resize-none focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                    required
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowStatusModal(false)}
                    className="border border-border-color hover:bg-gray-50 text-xs font-bold px-4 py-2"
                  >
                    Cerrar
                  </Button>
                  <Button 
                    type="submit" 
                    isLoading={changeStatusMutation.isPending}
                    className="bg-navy-blue text-white hover:bg-navy-blue/90 font-black text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Aplicar Transición
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: ASSIGN ANALYST */}
      <AnimatePresence>
        {showAssignModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-border-color shadow-2xl p-6 max-w-md w-full relative"
            >
              <button 
                onClick={() => setShowAssignModal(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-sm font-black text-text-primary flex items-center gap-2 border-b border-border-color pb-3">
                <UserCheck className="w-4.5 h-4.5 text-navy-blue" />
                Asignación de Analista Responsable
              </h3>

              <form onSubmit={handleAssignSubmit} className="mt-4 space-y-4">
                {isLoadingUsers ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="w-6 h-6 text-navy-blue animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-primary">Seleccionar Analista</label>
                      <select
                        value={selectedAnalystId}
                        onChange={(e) => setSelectedAnalystId(Number(e.target.value))}
                        className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                        required
                      >
                        <option value="">Seleccione un analista...</option>
                        {analistas.map((analista) => (
                          <option key={analista.id} value={analista.id}>
                            {analista.fullName} ({analista.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-primary">Comentario de Asignación</label>
                      <textarea
                        value={assignComment}
                        onChange={(e) => setAssignComment(e.target.value)}
                        placeholder="Instrucciones del caso o prioridad de revisión..."
                        rows={3}
                        className="w-full p-2.5 border border-border-color rounded-lg text-xs font-semibold resize-none focus:outline-none focus:ring-2 focus:ring-navy-blue/20"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 justify-end pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAssignModal(false)}
                    className="border border-border-color hover:bg-gray-50 text-xs font-bold px-4 py-2"
                  >
                    Cerrar
                  </Button>
                  <Button 
                    type="submit" 
                    isLoading={assignAnalystMutation.isPending}
                    className="bg-navy-blue text-white hover:bg-navy-blue/90 font-black text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Asignar Responsable
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

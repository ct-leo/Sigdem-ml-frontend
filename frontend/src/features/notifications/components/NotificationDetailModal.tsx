import React from "react";
import { X, Mail, FileText, RefreshCw, Loader2, AlertTriangle } from "lucide-react";
import { useNotification } from "../hooks/useNotification";
import { useResendNotification } from "../hooks/useResendNotification";
import { notificationMapper } from "../utils/notification.mapper";
import { alerts } from "../../../utils/sweetalert";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notificationId: number;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  isOpen,
  onClose,
  notificationId,
}) => {
  const { data: detail, isLoading } = useNotification(notificationId);
  const { mutate: resendEmail, isPending: isResending } = useResendNotification();

  const handleResend = async () => {
    if (!detail) return;
    const result = await alerts.confirmDelete(
      "¿Reenviar Notificación?",
      `¿Está seguro que desea volver a despachar este correo oficial a "${detail.destinatario}"?`
    );

    if (result.isConfirmed) {
      resendEmail(detail.id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  if (!isOpen) return null;

  const statusLabel = detail ? notificationMapper.getStatusLabel(detail.estado) : "";
  const colorClass = detail ? notificationMapper.getStatusColorClass(detail.estado) : "";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-navy-blue to-blue-900 text-white">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-300" />
              <h2 className="text-base font-black tracking-wide uppercase">
                Inspección de Comunicación Oficial [ID: {notificationId}]
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <span className="text-2xs font-extrabold uppercase tracking-widest text-slate-500">Cargando bitácora de envío...</span>
              </div>
            ) : !detail ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                <AlertTriangle className="w-10 h-10 text-rose-500 mb-2" />
                <span className="text-xs font-bold">No se encontró registro para la notificación especificada.</span>
              </div>
            ) : (
              <>
                {/* Meta details cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Destinatario card */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-1.5">
                    <span className="text-3xs font-extrabold uppercase text-slate-400">Destinatario Oficial</span>
                    <span className="text-xs font-black text-slate-800 dark:text-white truncate">{detail.destinatario}</span>
                  </div>

                  {/* Estado card */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-1.5 justify-center">
                    <span className="text-3xs font-extrabold uppercase text-slate-400 block mb-1">Estado de Despacho</span>
                    <div>
                      <span className={`px-2.5 py-0.5 rounded-full text-3xs font-black uppercase border ${colorClass}`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Fecha Creación card */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-1.5">
                    <span className="text-3xs font-extrabold uppercase text-slate-400">Fecha Registro</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {notificationMapper.formatTimelineDate(detail.fecha_creacion)}
                    </span>
                  </div>

                  {/* Fecha Envío card */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-1.5">
                    <span className="text-3xs font-extrabold uppercase text-slate-400">Fecha Despacho</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {notificationMapper.formatTimelineDate(detail.fecha_envio)}
                    </span>
                  </div>
                </div>

                {/* Subject Block */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-3xs font-extrabold uppercase text-slate-400 tracking-wider">Asunto Oficial</span>
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-100 dark:border-slate-800 font-black text-xs text-slate-800 dark:text-white">
                    {detail.asunto}
                  </div>
                </div>

                {/* Message Box */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-3xs font-extrabold uppercase text-slate-400 tracking-wider">Cuerpo del Mensaje</span>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-100 dark:border-slate-800 font-semibold text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {detail.mensaje}
                  </div>
                </div>

                {/* Auditable Associated Tramite */}
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-slate-900/50 rounded-xl border border-blue-100/50 dark:border-slate-800">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-4xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Trámite Vinculado
                    </span>
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase truncate">
                      {detail.tramite_id ? `Expediente ID: ${detail.tramite_id}` : "Ninguno asociado"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-3">
            <div>
              {detail && (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-black uppercase rounded-lg flex items-center gap-2 shadow transition-colors"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Reenviando...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reenviar Notificación
                    </>
                  )}
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase rounded-lg bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default NotificationDetailModal;

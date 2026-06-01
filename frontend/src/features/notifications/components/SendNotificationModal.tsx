import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Mail, FileText, Send, Loader2 } from "lucide-react";
import { sendNotificationSchema } from "../schemas/notification.schema";
import type { SendNotificationFormValues } from "../schemas/notification.schema";
import { useSendNotification } from "../hooks/useSendNotification";
import { useTramites } from "../../tramites/hooks/useTramites";
import { motion, AnimatePresence } from "framer-motion";

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SendNotificationModal: React.FC<SendNotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate: sendEmail, isPending } = useSendNotification();
  const { data: tramites, isLoading: isLoadingTramites } = useTramites();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendNotificationFormValues>({
    resolver: zodResolver(sendNotificationSchema),
    defaultValues: {
      destinatario: "",
      asunto: "",
      mensaje: "",
      tramite_id: undefined,
    },
  });

  const onSubmit = (values: SendNotificationFormValues) => {
    // Format payload properly
    const payload = {
      destinatario: values.destinatario,
      asunto: values.asunto,
      mensaje: values.mensaje,
      tramite_id: values.tramite_id ? Number(values.tramite_id) : undefined,
    };

    sendEmail(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-navy-blue to-blue-900 text-white">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-golden-sand animate-pulse" />
              <h2 className="text-base font-black tracking-wide uppercase">
                Redactar Notificación Oficial (Email)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-y-auto flex-1">
            <div className="p-6 flex flex-col gap-4">
              {/* Destinatario */}
              <div className="flex flex-col gap-1.5">
                <label className="text-3xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Destinatario (Email del Ciudadano) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    {...register("destinatario")}
                    placeholder="correo@ejemplo.com"
                    className="w-full h-10 pl-9 pr-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {errors.destinatario && (
                  <span className="text-3xs font-bold text-rose-500">{errors.destinatario.message}</span>
                )}
              </div>

              {/* Asunto */}
              <div className="flex flex-col gap-1.5">
                <label className="text-3xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Asunto del Oficio *
                </label>
                <input
                  type="text"
                  {...register("asunto")}
                  placeholder="Notificación de trámite observado..."
                  className="w-full h-10 px-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.asunto && (
                  <span className="text-3xs font-bold text-rose-500">{errors.asunto.message}</span>
                )}
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-1.5">
                <label className="text-3xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Mensaje Institucional (Notificación Oficial) *
                </label>
                <textarea
                  {...register("mensaje")}
                  rows={5}
                  placeholder="Escriba los detalles formales de la resolución municipal o requerimiento..."
                  className="w-full p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                {errors.mensaje && (
                  <span className="text-3xs font-bold text-rose-500">{errors.mensaje.message}</span>
                )}
              </div>

              {/* Tramite Asoc. Dropdown (Optional) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-3xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Trámite Municipal Vinculado (Opcional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    {...register("tramite_id")}
                    className="w-full h-10 pl-9 pr-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Sin trámite asociado --</option>
                    {isLoadingTramites ? (
                      <option disabled>Cargando expedientes municipales...</option>
                    ) : (
                      tramites?.map((t) => (
                        <option key={t.id} value={t.id}>
                          [ID: {t.id}] {t.codigo} - {t.tipo_tramite} ({t.area_responsable})
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase rounded-lg bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-black uppercase rounded-lg flex items-center gap-2 shadow transition-colors"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Oficio
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default SendNotificationModal;

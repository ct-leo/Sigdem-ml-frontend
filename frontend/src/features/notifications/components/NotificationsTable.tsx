import React from "react";
import type { Notification } from "../types/notification.types";
import { notificationMapper } from "../utils/notification.mapper";
import { Mail, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface NotificationsTableProps {
  notifications: Notification[];
  isLoading: boolean;
  onSelectNotification: (id: number) => void;
}

export const NotificationsTable: React.FC<NotificationsTableProps> = ({
  notifications,
  isLoading,
  onSelectNotification,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 select-none">
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-400">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-3xs font-extrabold uppercase tracking-widest text-slate-500">Cargando comunicaciones oficiales...</span>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed rounded-xl p-12 text-center select-none">
        <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-600 flex items-center justify-center mx-auto mb-3 border border-dashed border-slate-200 dark:border-slate-800">
          <Mail className="w-6 h-6" />
        </div>
        <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1">
          Sin Comunicaciones Registradas
        </h4>
        <p className="text-3xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto font-semibold uppercase leading-relaxed">
          No existen notificaciones de correo electrónico que coincidan con los filtros activos.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-3xs font-extrabold uppercase text-slate-400 tracking-wider bg-slate-50/50 dark:bg-slate-950/20">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Destinatario</th>
              <th className="py-3 px-4">Asunto</th>
              <th className="py-3 px-4 text-center">Estado</th>
              <th className="py-3 px-4 text-center">Trámite</th>
              <th className="py-3 px-4">Registro</th>
              <th className="py-3 px-4">Despacho</th>
              <th className="py-3 px-4 text-right">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
            {notifications.map((row) => {
              const label = notificationMapper.getStatusLabel(row.estado);
              const colorClass = notificationMapper.getStatusColorClass(row.estado);
              return (
                <motion.tr
                  key={row.id}
                  whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.4)" }}
                  onClick={() => onSelectNotification(row.id)}
                  className="cursor-pointer transition-colors hover:bg-slate-50/30 dark:hover:bg-slate-800/20"
                >
                  <td className="py-4 px-4 text-2xs font-extrabold text-slate-400">
                    #{row.id}
                  </td>
                  <td className="py-4 px-4 font-black uppercase text-slate-800 dark:text-white truncate max-w-[150px]">
                    {row.destinatario}
                  </td>
                  <td className="py-4 px-4 truncate max-w-[200px] text-slate-600 dark:text-slate-400 font-semibold italic">
                    "{row.asunto}"
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-4xs font-extrabold uppercase border ${colorClass}`}>
                      {label}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-3xs font-extrabold text-slate-500">
                    {row.tramite_id ? `EXP-${row.tramite_id}` : "—"}
                  </td>
                  <td className="py-4 px-4 text-3xs font-semibold text-slate-500">
                    {notificationMapper.formatTimelineDate(row.fecha_creacion)}
                  </td>
                  <td className="py-4 px-4 text-3xs font-semibold text-slate-500">
                    {row.fecha_envio ? notificationMapper.formatTimelineDate(row.fecha_envio) : "—"}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-3xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">
                      <Eye className="w-3 h-3" />
                      Inspeccionar
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default NotificationsTable;

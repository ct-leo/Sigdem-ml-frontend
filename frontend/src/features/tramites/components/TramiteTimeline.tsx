import React from "react";
import type { TramiteHistory } from "../types/tramite.types";
import { CheckCircle, Clock, AlertTriangle, XCircle, UserCheck } from "lucide-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

interface Props {
  history: TramiteHistory[];
}

export const TramiteTimeline: React.FC<Props> = ({ history }) => {
  const getIcon = (status: string | null) => {
    switch (status) {
      case 'APROBADO': return <CheckCircle className="w-5 h-5 text-dashboard-green" />;
      case 'RECHAZADO': return <XCircle className="w-5 h-5 text-danger" />;
      case 'OBSERVADO': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'EN_REVISION': return <Clock className="w-5 h-5 text-navy-blue" />;
      case 'FINALIZADO': return <CheckCircle className="w-5 h-5 text-slate-700" />;
      case 'REGISTRADO':
      default: return <UserCheck className="w-5 h-5 text-text-secondary" />;
    }
  };

  const getBgColor = (status: string | null) => {
    switch (status) {
      case 'APROBADO': return 'bg-dashboard-green/10';
      case 'RECHAZADO': return 'bg-danger/10';
      case 'OBSERVADO': return 'bg-warning/10';
      case 'EN_REVISION': return 'bg-navy-blue/10';
      case 'FINALIZADO': return 'bg-slate-100';
      case 'REGISTRADO':
      default: return 'bg-gray-100';
    }
  };

  if (!history || history.length === 0) {
    return (
      <div className="text-center p-6 text-xs text-text-secondary font-semibold">
        No hay registros históricos en la bitácora de este trámite.
      </div>
    );
  }

  return (
    <div className="relative pl-4 border-l border-border-color ml-4 space-y-8 select-none">
      {history.map((event, index) => (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          key={event.id} 
          className="relative"
        >
          <div className={`absolute -left-8 p-1 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center ${getBgColor(event.estado_nuevo)}`}>
            {getIcon(event.estado_nuevo)}
          </div>
          <div className="pl-4">
            <h4 className="text-sm font-extrabold text-text-primary">{event.accion}</h4>
            <div className="flex items-center text-[10px] text-text-secondary mt-1 gap-2">
              <span>{dayjs(event.fecha).format("DD MMM YYYY, HH:mm")}</span>
              <span>•</span>
              <span className="font-bold">Usuario ID: {event.usuario_id}</span>
            </div>
            {event.comentario && (
              <p className="text-xs text-text-secondary mt-2 bg-light-bg p-3 rounded-lg border border-border-color/50 leading-relaxed font-semibold">
                {event.comentario}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

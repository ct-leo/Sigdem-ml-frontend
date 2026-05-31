import React from "react";
import type { TramiteHistory } from "../types/tramite.types";
import { CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

interface Props {
  history: TramiteHistory[];
}

export const TramiteTimeline: React.FC<Props> = ({ history }) => {
  const getIcon = (status: string) => {
    switch (status) {
      case 'Aprobado': return <CheckCircle className="w-5 h-5 text-dashboard-green" />;
      case 'Rechazado': return <XCircle className="w-5 h-5 text-danger" />;
      case 'Observado': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'En Revisión': return <Clock className="w-5 h-5 text-navy-blue" />;
      case 'Registrado':
      default: return <CheckCircle className="w-5 h-5 text-text-secondary" />;
    }
  };

  const getBgColor = (status: string) => {
    switch (status) {
      case 'Aprobado': return 'bg-dashboard-green/10';
      case 'Rechazado': return 'bg-danger/10';
      case 'Observado': return 'bg-warning/10';
      case 'En Revisión': return 'bg-navy-blue/10';
      case 'Registrado':
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="relative pl-4 border-l border-border-color ml-4 space-y-8">
      {history.map((event, index) => (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          key={event.id} 
          className="relative"
        >
          <div className={`absolute -left-8 p-1 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center ${getBgColor(event.status)}`}>
            {getIcon(event.status)}
          </div>
          <div className="pl-4">
            <h4 className="text-sm font-semibold text-text-primary">{event.action}</h4>
            <div className="flex items-center text-xs text-text-secondary mt-1 gap-2">
              <span>{dayjs(event.timestamp).format("DD MMM YYYY, HH:mm")}</span>
              <span>•</span>
              <span className="font-medium">{event.user}</span>
            </div>
            {event.details && (
              <p className="text-sm text-text-secondary mt-2 bg-light-bg p-3 rounded-lg border border-border-color/50">
                {event.details}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

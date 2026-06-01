import React from "react";
import { MailOpen } from "lucide-react";

export const NotificationEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-border-color rounded-xl shadow-sm select-none gap-3">
      <div className="p-4 bg-light-bg rounded-full">
        <MailOpen className="w-8 h-8 text-navy-blue" />
      </div>
      <h4 className="font-extrabold text-text-primary text-sm">Bandeja de Entrada Vacía</h4>
      <p className="text-xs text-text-secondary max-w-sm font-semibold leading-normal">
        No se registran eventos o alertas relevantes en su panel de notificaciones en este momento.
      </p>
    </div>
  );
};

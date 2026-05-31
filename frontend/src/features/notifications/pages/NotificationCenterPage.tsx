import React from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { NotificationCenter } from "../components/NotificationCenter";

export const NotificationCenterPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Centro de Notificaciones"
        description="Consulta eventos, alertas, incidencias de inteligencia artificial y actividades operativas del sistema."
      />

      <NotificationCenter />
    </div>
  );
};

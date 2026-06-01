import React from "react";
import type { LegacyUser } from "../types/user.types";
import { Card, CardContent } from "../../../components/ui/Card";
import { Activity, Clock } from "lucide-react";

interface UserActivityCardProps {
  user: LegacyUser;
}

export const UserActivityCard: React.FC<UserActivityCardProps> = ({ user }) => {
  return (
    <Card className="border border-border-color shadow-sm h-full select-none">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b border-border-color pb-3">
          <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5">
            <Activity className="w-4.5 h-4.5 text-navy-blue" />
            Historial de Actividades & Bitácora de Auditoría
          </h3>
          <p className="text-xs text-text-secondary">
            Registro secuencial de las últimas acciones operativas realizadas en la plataforma.
          </p>
        </div>

        <div className="flex flex-col gap-5 mt-2 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-color">
          {user.activities.length > 0 ? (
            user.activities.map((act) => (
              <div key={act.id} className="flex gap-4 relative pl-7 text-xs font-semibold">
                {/* Timeline dot */}
                <div className="absolute left-[9px] top-1.5 w-2 h-2 rounded-full bg-navy-blue border border-white shrink-0" />
                
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center gap-4 flex-wrap">
                    <span className="font-bold text-text-primary text-xs">{act.action}</span>
                    <span className="text-[10px] text-text-secondary font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-text-secondary" />
                      {new Date(act.timestamp).toLocaleDateString()} {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="text-[10px] text-text-secondary leading-normal font-semibold">
                    {act.details}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs font-semibold text-text-secondary">
              No se han registrado actividades recientes en la plataforma.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

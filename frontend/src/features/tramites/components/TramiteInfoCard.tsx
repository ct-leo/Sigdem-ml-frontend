import React from "react";
import type { Tramite } from "../types/tramite.types";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { User, Mail, Briefcase, Hash, Calendar } from "lucide-react";
import dayjs from "dayjs";
import { TramiteStatusBadge } from "./TramiteStatusBadge";
import { TramitePriorityBadge } from "./TramitePriorityBadge";

interface Props {
  tramite: Tramite;
}

export const TramiteInfoCard: React.FC<Props> = ({ tramite }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Información del Expediente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-text-secondary flex items-center gap-1"><Hash className="w-3 h-3" /> CÓDIGO</span>
            <p className="font-semibold text-navy-blue">{tramite.code}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-text-secondary flex items-center gap-1"><Briefcase className="w-3 h-3" /> TIPO</span>
            <p className="font-medium text-text-primary">{tramite.type}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-text-secondary">ESTADO</span>
            <div><TramiteStatusBadge status={tramite.status} /></div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-text-secondary">PRIORIDAD</span>
            <div><TramitePriorityBadge priority={tramite.priority} /></div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-color">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Solicitante</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-light-bg rounded-lg"><User className="w-4 h-4 text-text-secondary" /></div>
              <div>
                <p className="text-sm font-medium text-text-primary">{tramite.applicant.name}</p>
                {tramite.applicant.document && <p className="text-xs text-text-secondary">Doc: {tramite.applicant.document}</p>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-light-bg rounded-lg"><Mail className="w-4 h-4 text-text-secondary" /></div>
              <p className="text-sm text-text-primary">{tramite.applicant.email}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-color">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Responsabilidad</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Área Asignada:</span>
              <span className="font-medium text-text-primary">{tramite.responsibleArea}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Responsable:</span>
              <span className="font-medium text-text-primary">{tramite.assignedTo || "No asignado"}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-color">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Descripción</h4>
          <p className="text-sm text-text-secondary leading-relaxed bg-light-bg p-4 rounded-xl border border-border-color/50">
            {tramite.description}
          </p>
        </div>
        
        <div className="pt-4 flex justify-between items-center text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Creado el {dayjs(tramite.createdAt).format("DD/MM/YYYY")}
          </div>
          <div>Actualizado hace {dayjs().diff(dayjs(tramite.updatedAt), 'hour')} hrs</div>
        </div>
      </CardContent>
    </Card>
  );
};

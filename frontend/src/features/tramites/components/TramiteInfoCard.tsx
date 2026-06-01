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
    <Card className="h-full select-none">
      <CardHeader>
        <CardTitle>Información del Expediente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
          <div className="space-y-1">
            <span className="text-[10px] text-text-secondary flex items-center gap-1 uppercase font-black"><Hash className="w-3.5 h-3.5" /> CÓDIGO</span>
            <p className="font-extrabold text-navy-blue text-sm">{tramite.codigo}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-text-secondary flex items-center gap-1 uppercase font-black"><Briefcase className="w-3.5 h-3.5" /> TIPO</span>
            <p className="font-bold text-text-primary text-xs">{tramite.tipo_tramite}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-text-secondary uppercase font-black">ESTADO</span>
            <div><TramiteStatusBadge status={tramite.estado} /></div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-text-secondary uppercase font-black">PRIORIDAD</span>
            <div><TramitePriorityBadge priority={tramite.prioridad} /></div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-color">
          <h4 className="text-xs font-extrabold text-text-primary uppercase tracking-wider mb-3">Solicitante</h4>
          <div className="space-y-3 text-xs font-semibold">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-light-bg rounded-lg"><User className="w-4 h-4 text-text-secondary" /></div>
              <div>
                <p className="font-bold text-text-primary capitalize">{tramite.correo_solicitante.split('@')[0]}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-light-bg rounded-lg"><Mail className="w-4 h-4 text-text-secondary" /></div>
              <p className="text-text-primary">{tramite.correo_solicitante}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-color">
          <h4 className="text-xs font-extrabold text-text-primary uppercase tracking-wider mb-3">Responsabilidad</h4>
          <div className="space-y-2 text-xs font-semibold">
            <div className="flex justify-between">
              <span className="text-text-secondary">Área Asignada:</span>
              <span className="font-bold text-text-primary">{tramite.area_responsable}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Responsable:</span>
              <span className="font-bold text-text-primary">{tramite.analista_id ? `Analista #${tramite.analista_id}` : "Sin asignar"}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-color">
          <h4 className="text-xs font-extrabold text-text-primary uppercase tracking-wider mb-3">Descripción</h4>
          <p className="text-xs text-text-secondary leading-relaxed bg-light-bg p-4 rounded-xl border border-border-color/50 font-semibold">
            {tramite.descripcion}
          </p>
        </div>
        
        <div className="pt-4 flex justify-between items-center text-[10px] text-text-secondary font-bold">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Creado el {dayjs(tramite.fecha_registro).format("DD/MM/YYYY")}
          </div>
          <div>Actualizado el {dayjs(tramite.fecha_actualizacion).format("DD/MM/YYYY")}</div>
        </div>
      </CardContent>
    </Card>
  );
};

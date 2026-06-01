export type TramiteStatus =
  | "REGISTRADO"
  | "EN_REVISION"
  | "OBSERVADO"
  | "APROBADO"
  | "RECHAZADO"
  | "FINALIZADO";

export type TramitePriority =
  | "BAJA"
  | "MEDIA"
  | "ALTA"
  | "CRITICA";

export interface Tramite {
  id: number;
  codigo: string;
  tipo_tramite: string;
  descripcion: string;
  area_responsable: string;
  correo_solicitante: string;
  estado: TramiteStatus;
  prioridad: TramitePriority;
  recepcionista_id: number;
  analista_id: number | null;
  fecha_registro: string;
  fecha_actualizacion: string;
}

export interface TramiteHistory {
  id: number;
  tramite_id: number;
  usuario_id: number;
  accion: string;
  estado_anterior: string | null;
  estado_nuevo: string | null;
  comentario: string;
  fecha: string;
}

export interface CreateTramiteDto {
  tipo_tramite: string;
  descripcion: string;
  area_responsable: string;
  correo_solicitante: string;
}

export interface UpdateTramiteDto {
  tipo_tramite: string;
  descripcion: string;
  area_responsable: string;
  correo_solicitante: string;
  prioridad: TramitePriority;
}

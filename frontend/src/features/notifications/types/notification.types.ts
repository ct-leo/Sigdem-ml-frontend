export type NotificationStatus =
  | "PENDIENTE"
  | "ENVIADO"
  | "FALLIDO"
  | "SIMULADO";

export interface Notification {
  id: number;
  destinatario: string;
  asunto: string;
  mensaje: string;
  estado: NotificationStatus;
  tramite_id: number | null;
  created_by_id: number;
  fecha_creacion: string;
  fecha_envio: string | null;
}

export interface SendNotificationDto {
  destinatario: string;
  asunto: string;
  mensaje: string;
  tramite_id?: number;
}

export interface NotificationResponse {
  id: number;
  destinatario: string;
  asunto: string;
  mensaje: string;
  estado: NotificationStatus;
  tramite_id: number | null;
  created_by_id: number;
  fecha_creacion: string;
  fecha_envio: string | null;
}

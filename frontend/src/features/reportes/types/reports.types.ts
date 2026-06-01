export interface TramitesReport {
  total_tramites: number;
  registrados: number;
  en_revision: number;
  observados: number;
  aprobados: number;
  rechazados: number;
  finalizados: number;

  prioridades: {
    BAJA: number;
    MEDIA: number;
    ALTA: number;
    CRITICA: number;
  };
}

export interface DocumentsReport {
  total_documentos: number;
  documentos_con_ocr: number;
  documentos_sin_ocr: number;
  documentos_asociados_tramite: number;
}

export interface RRHHReport {
  total_convocatorias: number;
  abiertas: number;
  pausadas: number;
  cerradas: number;
  total_cvs: number;
  cvs_procesados: number;
  cvs_pendientes: number;
}

export interface NotificationsReport {
  total_notificaciones: number;
  enviadas: number;
  fallidas: number;
  simuladas: number;
  pendientes: number;
}

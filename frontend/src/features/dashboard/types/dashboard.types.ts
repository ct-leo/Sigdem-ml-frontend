export interface DashboardSummary {
  total_usuarios: number;
  total_tramites: number;
  total_documentos: number;
  total_convocatorias: number;
  total_cvs: number;
}

export interface TramiteStatus {
  estado: string;
  total: number;
}

export interface TramitePriority {
  prioridad: string;
  total: number;
}

export interface DashboardRRHH {
  total_convocatorias: number;
  total_cvs: number;
  cvs_procesados: number;
  cvs_pendientes: number;
}

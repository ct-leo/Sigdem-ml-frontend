export type TramiteStatus = 'Registrado' | 'En Revisión' | 'Observado' | 'Aprobado' | 'Rechazado';
export type TramitePriority = 'Baja' | 'Media' | 'Alta' | 'Crítica';

export interface TramiteHistory {
  id: string;
  action: string;
  timestamp: string; // ISO String
  user: string;
  details?: string;
  status: TramiteStatus;
}

export interface TramiteDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string; // ISO String
  url: string;
}

export interface Tramite {
  id: string;
  code: string;
  type: string;
  applicant: {
    name: string;
    email: string;
    document?: string;
  };
  description: string;
  status: TramiteStatus;
  priority: TramitePriority;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
  responsibleArea: string;
  assignedTo?: string;
  history: TramiteHistory[];
  documents: TramiteDocument[];
}

export interface CreateTramiteDto {
  type: string;
  description: string;
  applicantEmail: string;
  priority: TramitePriority;
  responsibleArea: string;
  observations?: string;
  files?: File[];
}

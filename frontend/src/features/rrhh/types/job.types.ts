export type JobStatus = "Borrador" | "Activa" | "Pausada" | "Cerrada" | "Finalizada";

export type JobArea =
  | "Recursos Humanos"
  | "Tesorería"
  | "Administración"
  | "Tecnologías de Información"
  | "Obras"
  | "Defensa Civil"
  | "Fiscalización"
  | "Secretaría General";

export interface JobRequirement {
  experienceYears: number;
  academicLevel: string; // e.g. "Bachiller", "Titulado", "Magíster"
  certifications: string[]; // e.g. ["ITIL", "CCNA"]
  skills: string[]; // e.g. ["TypeScript", "Excel Avanzado"]
}

export interface Job {
  id: string;
  code: string; // e.g. "CONV-2026-001"
  title: string;
  area: JobArea;
  description: string;
  vacancies: number;
  requirements: JobRequirement;
  publishedAt: string; // ISO String
  closedAt: string; // ISO String
  status: JobStatus;
  totalApplicationsCount: number; // Mock data applications
}

export interface CreateJobDto {
  title: string;
  area: JobArea;
  description: string;
  vacancies: number;
  experienceYears: number;
  academicLevel: string;
  certifications?: string; // comma separated in form
  skills: string; // comma separated in form
  publishedAt: string;
  closedAt: string;
  status: JobStatus;
}

export interface UpdateJobDto extends Partial<CreateJobDto> {
  id: string;
}

export interface JobStatistics {
  active: number;
  closed: number;
  draft: number;
  vacancies: number;
  applications: number;
}

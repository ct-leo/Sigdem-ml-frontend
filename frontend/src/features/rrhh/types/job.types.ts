export type JobStatus =
  | "ABIERTA"
  | "PAUSADA"
  | "CERRADA";

export interface Job {
  id: number;
  titulo: string;
  descripcion: string;
  requisitos: string;
  area: string;
  modalidad: string;
  ubicacion: string;
  estado: JobStatus;
  created_by_id: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface CreateJobDto {
  titulo: string;
  descripcion: string;
  requisitos: string;
  area: string;
  modalidad: string;
  ubicacion: string;
}

export interface UpdateJobDto {
  titulo: string;
  descripcion?: string;
  requisitos?: string;
  area?: string;
  modalidad?: string;
  ubicacion?: string;
  estado?: JobStatus;
}

export interface DeleteResponse {
  message: string;
}

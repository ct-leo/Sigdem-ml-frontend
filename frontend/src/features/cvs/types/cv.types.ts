// NLP Processing Status - matches backend enum
export type CVProcessedStatus = "SI" | "NO";

// Main CV interface mapping backend response
export interface CV {
  id: number;
  job_id: number;
  uploaded_by_id: number;

  nombre_candidato: string;
  correo_candidato: string;
  telefono_candidato: string;

  nombre_original: string;
  nombre_guardado: string;

  tipo_archivo: string;
  ruta_archivo: string;

  texto_extraido: string | null;

  texto_procesado: CVProcessedStatus;

  fecha_subida: string;
}

// DTO for uploading a new CV (FormData)
export interface UploadCVDto {
  file: File;
  nombre_candidato: string;
  correo_candidato: string;
  telefono_candidato: string;
  job_id: number;
}

// Response from NLP text extraction
export interface ExtractCVResponse {
  cv_id: number;
  texto_extraido: string;
  message: string;
}

// Generic delete response
export interface DeleteResponse {
  message: string;
}

// Query filters supported by the list endpoint
export interface CVFilters {
  job_id?: number;
}

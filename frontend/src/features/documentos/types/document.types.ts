export type OCRStatus = "SI" | "NO";

export type DocumentType = "PDF" | "DOCX" | "DOC" | "PNG" | "JPG" | "JPEG" | "XLSX";

export interface Document {
  id: number;
  tramite_id: number;
  uploaded_by_id: number;
  nombre_original: string;
  nombre_guardado: string;
  tipo_archivo: string;
  ruta_archivo: string;
  texto_extraido: string | null;
  ocr_procesado: OCRStatus;
  fecha_subida: string;
}

export interface UploadDocumentDto {
  file: File;
  tramite_id: number;
}

export interface OCRResponse {
  document_id: number;
  texto_extraido: string;
  message: string;
}

export interface DeleteResponse {
  message: string;
}

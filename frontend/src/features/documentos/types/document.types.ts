export type OCRStatus = 'Procesado' | 'Pendiente' | 'Error' | 'En Proceso';

export type DocumentType = 'PDF' | 'DOCX' | 'PNG' | 'JPG' | 'XLSX';

export interface DocumentOwner {
  name: string;
  role: string;
  area: string;
  avatarUrl?: string;
}

export interface DocumentMetadata {
  sizeFormatted: string;
  pages?: number;
  ocrAccuracy?: number; // 0 to 100
  processedAt?: string; // ISO String
  ocrText?: string;
  downloadUrl?: string;
}

export interface Document {
  id: string;
  code: string; // Institutional document code
  name: string;
  type: DocumentType;
  size: number; // in bytes
  uploadedAt: string; // ISO String
  responsibleArea: string;
  owner: DocumentOwner;
  statusOcr: OCRStatus;
  procedureCode: string; // Associated process code
  metadata: DocumentMetadata;
}

export interface DocumentStats {
  total: number;
  pdfs: number;
  processedOcr: number;
  pendingOcr: number;
  spaceUsed: string; // Formatted space e.g. "124.5 MB"
}

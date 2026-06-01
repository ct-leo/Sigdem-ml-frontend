import { apiClient } from "../../../api/axios";
import type { 
  Document, 
  UploadDocumentDto, 
  OCRResponse, 
  DeleteResponse 
} from "../types/document.types";

class DocumentsService {
  async getDocuments(filters?: { tramite_id?: number; ocr_procesado?: string }): Promise<Document[]> {
    const params: Record<string, any> = {};
    if (filters?.tramite_id !== undefined && filters.tramite_id !== null) {
      params.tramite_id = filters.tramite_id;
    }
    if (filters?.ocr_procesado) {
      params.ocr_procesado = filters.ocr_procesado;
    }

    const response = await apiClient.get<Document[]>("/documents/", { params });
    return response.data;
  }

  async getDocument(id: number): Promise<Document> {
    const response = await apiClient.get<Document>(`/documents/${id}`);
    return response.data;
  }

  async uploadDocument(data: UploadDocumentDto, onUploadProgress?: (progressEvent: any) => void): Promise<Document> {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("tramite_id", String(data.tramite_id));

    const response = await apiClient.post<Document>("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    return response.data;
  }

  async downloadDocument(id: number): Promise<Blob> {
    const response = await apiClient.get(`/documents/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  }

  async processOCR(id: number): Promise<OCRResponse> {
    const response = await apiClient.post<OCRResponse>(`/documents/${id}/ocr`);
    return response.data;
  }

  async deleteDocument(id: number): Promise<DeleteResponse> {
    const response = await apiClient.delete<DeleteResponse>(`/documents/${id}`);
    return response.data;
  }
}

export const documentsService = new DocumentsService();

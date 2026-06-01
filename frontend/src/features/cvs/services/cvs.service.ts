import apiClient from "../../../api/axios";
import type {
  CV,
  UploadCVDto,
  ExtractCVResponse,
  DeleteResponse,
  CVFilters,
} from "../types/cv.types";

export const cvsService = {
  /**
   * GET /cvs/
   * List all CVs, optionally filtered by job_id
   */
  getCVs: async (filters?: CVFilters): Promise<CV[]> => {
    const params: Record<string, unknown> = {};
    if (filters?.job_id) params.job_id = filters.job_id;

    const response = await apiClient.get<CV[]>("/cvs/", { params });
    return response.data;
  },

  /**
   * GET /cvs/{id}
   * Retrieve a single CV by ID
   */
  getCV: async (id: number): Promise<CV> => {
    const response = await apiClient.get<CV>(`/cvs/${id}`);
    return response.data;
  },

  /**
   * POST /cvs/upload
   * Upload a new CV with candidate data as multipart/form-data.
   * onUploadProgress callback is used to report progress (0 → 100).
   */
  uploadCV: async (
    data: UploadCVDto,
    onUploadProgress?: (progress: number) => void
  ): Promise<CV> => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("nombre_candidato", data.nombre_candidato);
    formData.append("correo_candidato", data.correo_candidato);
    formData.append("telefono_candidato", data.telefono_candidato);
    formData.append("job_id", String(data.job_id));

    const response = await apiClient.post<CV>("/cvs/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        if (onUploadProgress && event.total) {
          const pct = Math.round((event.loaded * 100) / event.total);
          onUploadProgress(pct);
        }
      },
    });
    return response.data;
  },

  /**
   * POST /cvs/{id}/extract
   * Trigger text extraction for an uploaded CV
   */
  extractCV: async (id: number): Promise<ExtractCVResponse> => {
    const response = await apiClient.post<ExtractCVResponse>(`/cvs/${id}/extract`);
    return response.data;
  },

  /**
   * GET /cvs/{id}/download
   * Download the raw file as a Blob through the authenticated API.
   * This is the correct way to serve protected files — avoids 404/401
   * errors that occur when trying to access ruta_archivo directly.
   */
  downloadCV: async (id: number): Promise<Blob> => {
    const response = await apiClient.get(`/cvs/${id}/download`, {
      responseType: "blob",
      timeout: 60000, // larger timeout for file downloads
    });
    return response.data;
  },

  /**
   * DELETE /cvs/{id}
   */
  deleteCV: async (id: number): Promise<DeleteResponse> => {
    const response = await apiClient.delete<DeleteResponse>(`/cvs/${id}`);
    return response.data;
  },
};

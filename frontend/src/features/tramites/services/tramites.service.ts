import { apiClient } from "../../../api/axios";
import type { 
  Tramite, 
  TramiteHistory, 
  CreateTramiteDto, 
  UpdateTramiteDto,
  TramiteStatus
} from "../types/tramite.types";

class TramitesService {
  async getTramites(filters?: { estado?: string; prioridad?: string; area?: string }): Promise<Tramite[]> {
    const params: Record<string, string> = {};
    if (filters?.estado) params.estado = filters.estado;
    if (filters?.prioridad) params.prioridad = filters.prioridad;
    if (filters?.area) params.area = filters.area;

    const response = await apiClient.get<Tramite[]>("/tramites/", { params });
    return response.data;
  }

  async getTramite(id: number): Promise<Tramite> {
    const response = await apiClient.get<Tramite>(`/tramites/${id}`);
    return response.data;
  }

  async createTramite(data: CreateTramiteDto): Promise<Tramite> {
    const response = await apiClient.post<Tramite>("/tramites/", data);
    return response.data;
  }

  async updateTramite(id: number, data: UpdateTramiteDto): Promise<Tramite> {
    const response = await apiClient.put<Tramite>(`/tramites/${id}`, data);
    return response.data;
  }

  async changeStatus(id: number, data: { estado: TramiteStatus; comentario: string }): Promise<Tramite> {
    const response = await apiClient.patch<Tramite>(`/tramites/${id}/status`, data);
    return response.data;
  }

  async assignAnalyst(id: number, data: { analista_id: number; comentario: string }): Promise<Tramite> {
    const response = await apiClient.patch<Tramite>(`/tramites/${id}/assign`, data);
    return response.data;
  }

  async getHistory(id: number): Promise<TramiteHistory[]> {
    const response = await apiClient.get<TramiteHistory[]>(`/tramites/${id}/history`);
    return response.data;
  }
}

export const tramitesService = new TramitesService();

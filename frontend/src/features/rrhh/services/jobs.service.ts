import { apiClient } from "../../../api/axios";
import type { 
  Job, 
  CreateJobDto, 
  UpdateJobDto, 
  DeleteResponse,
  JobStatus
} from "../types/job.types";

class JobsService {
  async getJobs(filters?: { estado?: JobStatus; area?: string }): Promise<Job[]> {
    const params: Record<string, any> = {};
    if (filters?.estado) params.estado = filters.estado;
    if (filters?.area) params.area = filters.area;

    const response = await apiClient.get<Job[]>("/hr/jobs/", { params });
    return response.data;
  }

  async getJob(id: number): Promise<Job> {
    const response = await apiClient.get<Job>(`/hr/jobs/${id}`);
    return response.data;
  }

  async createJob(data: CreateJobDto): Promise<Job> {
    const response = await apiClient.post<Job>("/hr/jobs/", data);
    return response.data;
  }

  async updateJob(id: number, data: UpdateJobDto): Promise<Job> {
    const response = await apiClient.put<Job>(`/hr/jobs/${id}`, data);
    return response.data;
  }

  async deleteJob(id: number): Promise<DeleteResponse> {
    const response = await apiClient.delete<DeleteResponse>(`/hr/jobs/${id}`);
    return response.data;
  }
}

export const jobsService = new JobsService();

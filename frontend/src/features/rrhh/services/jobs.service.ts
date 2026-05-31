import type { Job, CreateJobDto, UpdateJobDto, JobStatistics } from "../types/job.types";
import { getInitialMockJobs, saveMockJobs } from "../data/mockJobs";

const DELAY = 600;

export const jobsService = {
  getJobs: async (): Promise<Job[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getInitialMockJobs());
      }, DELAY);
    });
  },

  getJobById: async (id: string): Promise<Job | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobs = getInitialMockJobs();
        const found = jobs.find((j) => j.id === id) || null;
        resolve(found);
      }, DELAY);
    });
  },

  createJob: async (dto: CreateJobDto): Promise<Job> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobs = getInitialMockJobs();
        const nextCode = `CONV-2026-${String(jobs.length + 1).padStart(3, "0")}`;
        const newJob: Job = {
          id: `job-${Math.random().toString(36).substr(2, 9)}`,
          code: nextCode,
          title: dto.title,
          area: dto.area,
          description: dto.description,
          vacancies: Number(dto.vacancies),
          requirements: {
            experienceYears: Number(dto.experienceYears),
            academicLevel: dto.academicLevel,
            certifications: dto.certifications
              ? dto.certifications.split(",").map((c) => c.trim()).filter(Boolean)
              : [],
            skills: dto.skills
              ? dto.skills.split(",").map((s) => s.trim()).filter(Boolean)
              : [],
          },
          publishedAt: dto.publishedAt,
          closedAt: dto.closedAt,
          status: dto.status,
          totalApplicationsCount: 0,
        };

        const updated = [...jobs, newJob];
        saveMockJobs(updated);
        resolve(newJob);
      }, DELAY);
    });
  },

  updateJob: async (dto: UpdateJobDto): Promise<Job> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const jobs = getInitialMockJobs();
        const idx = jobs.findIndex((j) => j.id === dto.id);
        if (idx === -1) {
          reject(new Error("Convocatoria no encontrada"));
          return;
        }

        const oldJob = jobs[idx];
        const updatedJob: Job = {
          ...oldJob,
          ...dto,
          vacancies: dto.vacancies !== undefined ? Number(dto.vacancies) : oldJob.vacancies,
          requirements: {
            experienceYears:
              dto.experienceYears !== undefined
                ? Number(dto.experienceYears)
                : oldJob.requirements.experienceYears,
            academicLevel: dto.academicLevel !== undefined ? dto.academicLevel : oldJob.requirements.academicLevel,
            certifications:
              dto.certifications !== undefined
                ? dto.certifications.split(",").map((c) => c.trim()).filter(Boolean)
                : oldJob.requirements.certifications,
            skills:
              dto.skills !== undefined
                ? dto.skills.split(",").map((s) => s.trim()).filter(Boolean)
                : oldJob.requirements.skills,
          },
        } as unknown as Job;

        const updated = [...jobs];
        updated[idx] = updatedJob;
        saveMockJobs(updated);
        resolve(updatedJob);
      }, DELAY);
    });
  },

  deleteJob: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobs = getInitialMockJobs();
        const filtered = jobs.filter((j) => j.id !== id);
        saveMockJobs(filtered);
        resolve(true);
      }, DELAY);
    });
  },

  getJobStats: async (): Promise<JobStatistics> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobs = getInitialMockJobs();
        const active = jobs.filter((j) => j.status === "Activa").length;
        const closed = jobs.filter((j) => j.status === "Cerrada" || j.status === "Finalizada").length;
        const draft = jobs.filter((j) => j.status === "Borrador").length;
        const vacancies = jobs.reduce((sum, j) => sum + (j.status === "Activa" ? j.vacancies : 0), 0);
        const applications = jobs.reduce((sum, j) => sum + j.totalApplicationsCount, 0);

        resolve({ active, closed, draft, vacancies, applications });
      }, DELAY);
    });
  },
};

export const CVS_KEYS = {
  all: ["cvs"] as const,
  list: ["cvs", "list"] as const,
  detail: (id: number) => ["cvs", id] as const,
  job: (jobId: number) => ["cvs", "job", jobId] as const,
};

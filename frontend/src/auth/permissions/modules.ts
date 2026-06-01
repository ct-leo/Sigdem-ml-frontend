export const AppModule = {
  DASHBOARD: "DASHBOARD",
  USERS: "USERS",
  TRAMITES: "TRAMITES",
  DOCUMENTS: "DOCUMENTS",
  MACHINE_LEARNING: "MACHINE_LEARNING",
  HR: "HR",
  CVS: "CVS",
  NLP: "NLP",
  RANKING: "RANKING",
  NOTIFICATIONS: "NOTIFICATIONS",
  REPORTS: "REPORTS",
} as const;

export type AppModule = typeof AppModule[keyof typeof AppModule];

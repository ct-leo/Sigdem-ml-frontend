export const REPORT_CATEGORIES = {
  TRAMITES: "tramites",
  DOCUMENTS: "documents",
  RRHH: "rrhh",
  NOTIFICATIONS: "notifications",
} as const;

export type ReportCategory = typeof REPORT_CATEGORIES[keyof typeof REPORT_CATEGORIES];

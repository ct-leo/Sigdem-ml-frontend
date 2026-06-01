import { AppModule } from "./modules";
import type { UserRole } from "./roles";

// Access matrix mapping roles to accessible modules
export const MODULE_ACCESS: Record<UserRole, AppModule[]> = {
  ADMIN: [
    AppModule.DASHBOARD,
    AppModule.USERS,
    AppModule.TRAMITES,
    AppModule.DOCUMENTS,
    AppModule.MACHINE_LEARNING,
    AppModule.HR,
    AppModule.CVS,
    AppModule.NLP,
    AppModule.RANKING,
    AppModule.NOTIFICATIONS,
    AppModule.REPORTS,
  ],
  RECEPCIONISTA: [
    AppModule.TRAMITES,
    AppModule.DOCUMENTS,
    AppModule.NOTIFICATIONS,
  ],
  ANALISTA: [
    AppModule.TRAMITES,
    AppModule.DOCUMENTS,
    AppModule.MACHINE_LEARNING,
    AppModule.NOTIFICATIONS,
  ],
  RRHH: [
    AppModule.HR,
    AppModule.CVS,
    AppModule.NLP,
    AppModule.RANKING,
    AppModule.NOTIFICATIONS,
  ],
};

// Granular CRUD permission actions
export type PermissionAction =
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "users.view"
  | "tramites.create"
  | "tramites.edit"
  | "tramites.delete"
  | "tramites.change_status"
  | "tramites.assign_analista"
  | "documents.upload"
  | "documents.delete"
  | "documents.ocr"
  | "ml.train"
  | "ml.classify"
  | "ml.metrics"
  | "rrhh.create"
  | "rrhh.edit"
  | "rrhh.delete"
  | "cvs.upload"
  | "cvs.delete"
  | "nlp.match"
  | "nlp.ranking"
  | "reports.view"
  | "reports.export"
  | "notifications.send"
  | "notifications.resend";

export const CRUD_PERMISSIONS: Record<PermissionAction, UserRole[]> = {
  // Users (ADMIN only)
  "users.create": ["ADMIN"],
  "users.edit": ["ADMIN"],
  "users.delete": ["ADMIN"],
  "users.view": ["ADMIN"],

  // Trámites
  "tramites.create": ["ADMIN", "RECEPCIONISTA"],
  "tramites.edit": ["ADMIN", "ANALISTA"],
  "tramites.delete": ["ADMIN"],
  "tramites.change_status": ["ADMIN", "ANALISTA"],
  "tramites.assign_analista": ["ADMIN"],

  // Documents
  "documents.upload": ["ADMIN", "RECEPCIONISTA", "ANALISTA"],
  "documents.delete": ["ADMIN"],
  "documents.ocr": ["ADMIN", "ANALISTA"],

  // Machine Learning
  "ml.train": ["ADMIN"],
  "ml.classify": ["ADMIN", "ANALISTA"],
  "ml.metrics": ["ADMIN", "ANALISTA"],

  // RRHH / Convocatorias
  "rrhh.create": ["ADMIN", "RRHH"],
  "rrhh.edit": ["ADMIN", "RRHH"],
  "rrhh.delete": ["ADMIN", "RRHH"],

  // CVs
  "cvs.upload": ["ADMIN", "RRHH"],
  "cvs.delete": ["ADMIN", "RRHH"],

  // NLP & Ranking
  "nlp.match": ["ADMIN", "RRHH"],
  "nlp.ranking": ["ADMIN", "RRHH"],

  // Reports (ADMIN only)
  "reports.view": ["ADMIN"],
  "reports.export": ["ADMIN"],

  // Notifications
  "notifications.send": ["ADMIN", "RECEPCIONISTA", "ANALISTA", "RRHH"],
  "notifications.resend": ["ADMIN"],
};

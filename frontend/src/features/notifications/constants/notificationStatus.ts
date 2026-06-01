import type { NotificationStatus } from "../types/notification.types";

export const NOTIFICATION_STATUS_LABELS: Record<NotificationStatus, string> = {
  PENDIENTE: "Pendiente",
  ENVIADO: "Enviado",
  FALLIDO: "Error",
  SIMULADO: "Simulado",
};

export const NOTIFICATION_STATUS_COLORS: Record<NotificationStatus, string> = {
  PENDIENTE: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
  ENVIADO: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
  FALLIDO: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50",
  SIMULADO: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
};

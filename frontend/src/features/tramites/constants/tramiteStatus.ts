import type { TramiteStatus } from "../types/tramite.types";

export const TRAMITE_STATUS_COLORS: Record<TramiteStatus, { text: string; bg: string; border: string }> = {
  REGISTRADO: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  EN_REVISION: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  OBSERVADO: { text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  APROBADO: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  RECHAZADO: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
  FINALIZADO: { text: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" },
};

export const TRAMITE_STATUS_LABELS: Record<TramiteStatus, string> = {
  REGISTRADO: "Registrado",
  EN_REVISION: "En Revisión",
  OBSERVADO: "Observado",
  APROBADO: "Aprobado",
  RECHAZADO: "Rechazado",
  FINALIZADO: "Finalizado",
};

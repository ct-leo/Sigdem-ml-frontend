export const JOB_STATUS_LABELS: Record<string, string> = {
  ABIERTA: "Convocatoria Activa",
  PAUSADA: "Temporalmente Pausada",
  CERRADA: "Proceso Cerrado",
};

export const JOB_STATUS_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  ABIERTA: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  PAUSADA: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  CERRADA: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
};

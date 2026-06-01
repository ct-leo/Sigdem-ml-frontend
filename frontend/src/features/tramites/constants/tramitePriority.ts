import type { TramitePriority } from "../types/tramite.types";

export const TRAMITE_PRIORITY_COLORS: Record<TramitePriority, { text: string; bg: string; border: string }> = {
  BAJA: { text: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" },
  MEDIA: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  ALTA: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  CRITICA: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
};

export const TRAMITE_PRIORITY_LABELS: Record<TramitePriority, string> = {
  BAJA: "Baja",
  MEDIA: "Media",
  ALTA: "Alta",
  CRITICA: "Crítica",
};

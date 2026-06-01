export const DOCUMENT_OCR_STATUS_LABELS: Record<string, string> = {
  SI: "Procesado",
  NO: "Pendiente",
};

export const DOCUMENT_OCR_STATUS_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  SI: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  NO: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
};

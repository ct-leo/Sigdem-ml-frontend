import type { CVProcessedStatus } from "../types/cv.types";

interface CVStatusConfig {
  label: string;
  badgeClass: string;
  description: string;
}

export const CV_PROCESSED_STATUS: Record<CVProcessedStatus, CVStatusConfig> = {
  SI: {
    label: "Procesado",
    badgeClass: "bg-[#749763]/10 text-[#749763] border border-[#749763]/25",
    description: "Texto extraído y procesado por el motor NLP",
  },
  NO: {
    label: "Pendiente",
    badgeClass: "bg-amber-50 text-amber-700 border border-amber-200",
    description: "Pendiente de extracción y análisis NLP",
  },
};

export const getCVStatusConfig = (status: CVProcessedStatus): CVStatusConfig =>
  CV_PROCESSED_STATUS[status] ?? CV_PROCESSED_STATUS.NO;

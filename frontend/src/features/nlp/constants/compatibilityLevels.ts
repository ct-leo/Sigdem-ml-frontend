export const COMPATIBILITY_LEVELS = {
  BAJA: "Compatibilidad Baja",
  MEDIA: "Compatibilidad Media",
  ALTA: "Compatibilidad Alta",
  EXCELENTE: "Compatibilidad Excelente",
} as const;

export type CompatibilityLevel = typeof COMPATIBILITY_LEVELS[keyof typeof COMPATIBILITY_LEVELS];

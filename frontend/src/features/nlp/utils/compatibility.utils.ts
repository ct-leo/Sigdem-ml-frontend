import { COMPATIBILITY_LEVELS } from "../constants/compatibilityLevels";
import type { CompatibilityLevel } from "../constants/compatibilityLevels";

export function getCompatibilityLevel(score: number): CompatibilityLevel {
  if (score >= 0 && score <= 39) {
    return COMPATIBILITY_LEVELS.BAJA;
  } else if (score >= 40 && score <= 69) {
    return COMPATIBILITY_LEVELS.MEDIA;
  } else if (score >= 70 && score <= 89) {
    return COMPATIBILITY_LEVELS.ALTA;
  } else {
    return COMPATIBILITY_LEVELS.EXCELENTE;
  }
}

export function getCompatibilityColor(score: number): string {
  if (score >= 90) return "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50";
  if (score >= 70) return "text-blue-500 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50";
  if (score >= 40) return "text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50";
  return "text-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50";
}

export function getCompatibilityProgressColor(score: number): string {
  if (score >= 90) return "#10b981"; // Emerald
  if (score >= 70) return "#3b82f6"; // Blue
  if (score >= 40) return "#f59e0b"; // Amber
  return "#f43f5e"; // Rose
}

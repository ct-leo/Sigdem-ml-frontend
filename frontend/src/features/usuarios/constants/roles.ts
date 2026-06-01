import type { UserRole } from "../types/user.types";

export const USER_ROLES: { label: string; value: UserRole }[] = [
  { label: "Administrador", value: "ADMIN" },
  { label: "Operador / Recepcionista", value: "RECEPCIONISTA" },
  { label: "Analista", value: "ANALISTA" },
  { label: "Recursos Humanos", value: "RRHH" },
];

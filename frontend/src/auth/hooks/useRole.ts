import { useUserStore } from "../../stores/userStore";
import type { UserRole } from "../permissions/roles";

export const getDefaultRouteForRole = (role: UserRole | null): string => {
  if (!role) return "/";
  switch (role) {
    case "ADMIN":
      return "/dashboard";
    case "RECEPCIONISTA":
    case "ANALISTA":
      return "/tramites";
    case "RRHH":
      return "/convocatorias";
    default:
      return "/";
  }
};

export const useRole = () => {
  // Read both "rol" and compatibility "role" from the persisted store
  const storedRol = useUserStore((state) => state.rol || state.role);
  
  // Normalize the role string to match UserRole
  const role: UserRole | null = storedRol ? (storedRol.toUpperCase() as UserRole) : null;

  return {
    role,
    isAdmin: role === "ADMIN",
    isAnalista: role === "ANALISTA",
    isRRHH: role === "RRHH",
    isRecepcionista: role === "RECEPCIONISTA",
    defaultRoute: getDefaultRouteForRole(role),
  };
};

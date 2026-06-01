export type UserRole = "ADMIN" | "RECEPCIONISTA" | "ANALISTA" | "RRHH";

export interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface CreateUserDto {
  nombre: string;
  correo: string;
  password: string;
  rol: UserRole;
}

export interface UpdateUserDto {
  nombre: string;
  correo: string;
  rol: UserRole;
  is_active: boolean;
}

export interface DeleteResponse {
  message: string;
}

// Mappings for Existing Frontend UI Compatibility
export type LegacyUserRole = UserRole;

export type UserStatus = "Activo" | "Inactivo" | "Suspendido" | "Bloqueado";

export const ROLE_MAP_TO_BACKEND: Record<string, UserRole> = {
  "ADMIN": "ADMIN",
  "RECEPCIONISTA": "RECEPCIONISTA",
  "ANALISTA": "ANALISTA",
  "RRHH": "RRHH",
};

export const ROLE_MAP_TO_FRONTEND: Record<UserRole, LegacyUserRole> = {
  "ADMIN": "ADMIN",
  "RECEPCIONISTA": "RECEPCIONISTA",
  "ANALISTA": "ANALISTA",
  "RRHH": "RRHH",
};

// Existing Frontend User interface for compatibility
export interface UserPermission {
  id: string;
  name: string;
  code: string;
  description: string;
  assigned: boolean;
}

export interface UserActivity {
  id: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface LegacyUser {
  id: string;
  fullName: string;
  email: string;
  role: LegacyUserRole;
  status: UserStatus;
  phone: string;
  position: string;
  registrationDate: string;
  lastAccess: string;
  permissions: UserPermission[];
  activities: UserActivity[];
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  operatorUsers: number;
  lastAccessCount: number;
}

// Convert Backend User to Legacy Frontend User
export const mapUserToLegacy = (u: User): LegacyUser => {
  const roleName = u.rol || "RECEPCIONISTA";
  return {
    id: String(u.id),
    fullName: u.nombre,
    email: u.correo,
    role: roleName,
    status: u.is_active ? "Activo" : "Inactivo",
    phone: "987654321", // Fallback for compatible UI rendering
    position: u.rol === "ADMIN" ? "Administrador de Sistemas" : "Funcionario Técnico",
    registrationDate: u.created_at || new Date().toISOString(),
    lastAccess: new Date().toISOString(),
    permissions: [
      { id: "p1", name: "Leer Documentos", code: "READ", description: "Ver expedientes", assigned: true },
      { id: "p2", name: "Editar Trámites", code: "WRITE", description: "Modificar información", assigned: u.rol !== "RECEPCIONISTA" },
    ],
    activities: [
      { id: "act1", action: "Acceso al sistema", details: "Inicio de sesión correcto", timestamp: new Date().toISOString() },
    ]
  };
};

export const USERS_KEYS = {
  all: ["users"],
  list: ["users", "list"],
  detail: (id: number) => ["users", id],
};

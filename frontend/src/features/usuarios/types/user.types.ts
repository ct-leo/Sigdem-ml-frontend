export type UserRole = "Administrador" | "Supervisor" | "Analista" | "Operador" | "RRHH";

export type UserStatus = "Activo" | "Inactivo" | "Suspendido" | "Bloqueado";

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
  timestamp: string; // ISO format string
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  position: string; // Cargo
  area: string; // Área municipal
  registrationDate: string; // ISO String
  lastAccess: string; // ISO String
  permissions: UserPermission[];
  activities: UserActivity[];
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  position: string;
  area: string;
  password?: string;
  confirmPassword?: string;
}

export interface UpdateUserDto {
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  position: string;
  area: string;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  operatorUsers: number;
  lastAccessCount: number;
}

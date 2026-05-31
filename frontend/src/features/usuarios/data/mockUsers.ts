import type { User } from "../types/user.types";

export const DEFAULT_PERMISSIONS = [
  { id: "perm-1", name: "Gestionar Usuarios", code: "USERS_MANAGE", description: "Crear, editar, suspender y eliminar usuarios internos del sistema.", assigned: false },
  { id: "perm-2", name: "Gestionar Trámites", code: "TRAMITES_MANAGE", description: "Registrar, modificar e inspeccionar expedientes administrativos.", assigned: false },
  { id: "perm-3", name: "Gestionar RRHH", code: "RRHH_MANAGE", description: "Administrar convocatorias, currículos y ranking de candidatos.", assigned: false },
  { id: "perm-4", name: "Visualizar Reportes", code: "REPORTS_VIEW", description: "Acceso al módulo de analíticas e informes generales de gestión.", assigned: false },
];

export const MOCK_USERS: User[] = [
  {
    id: "usr-001",
    fullName: "Carlos Mendoza",
    email: "carlos.mendoza@municipalidad.gob.pe",
    role: "Administrador",
    status: "Activo",
    phone: "987654321",
    position: "Jefe de Soporte y Sistemas",
    area: "Tecnologías de Información",
    registrationDate: "2026-01-10T08:30:00Z",
    lastAccess: "2026-05-31T15:45:00Z",
    permissions: DEFAULT_PERMISSIONS.map(p => ({ ...p, assigned: true })),
    activities: [
      { id: "act-101", action: "Inicio de sesión", details: "Ingreso exitoso al sistema desde la IP 192.168.10.15.", timestamp: "2026-05-31T15:45:00Z" },
      { id: "act-102", action: "Restablecimiento de contraseña", details: "Se restableció la contraseña de Ana Torres.", timestamp: "2026-05-31T14:10:00Z" },
      { id: "act-103", action: "Actualización de configuración", details: "Modificación de parámetros del sistema ML.", timestamp: "2026-05-30T10:00:00Z" },
    ]
  },
  {
    id: "usr-002",
    fullName: "Ana Torres",
    email: "ana.torres@municipalidad.gob.pe",
    role: "RRHH",
    status: "Activo",
    phone: "912345678",
    position: "Especialista de Reclutamiento",
    area: "Recursos Humanos",
    registrationDate: "2026-02-15T09:15:00Z",
    lastAccess: "2026-05-31T14:30:00Z",
    permissions: DEFAULT_PERMISSIONS.map(p => ({ ...p, assigned: p.code === "RRHH_MANAGE" || p.code === "REPORTS_VIEW" })),
    activities: [
      { id: "act-201", action: "Preselección de candidato", details: "Se preseleccionó a Juan Pérez en Convocatoria CONV-2026-001.", timestamp: "2026-05-31T14:22:00Z" },
      { id: "act-202", action: "Inicio de sesión", details: "Ingreso exitoso al sistema desde IP 192.168.10.22.", timestamp: "2026-05-31T13:00:00Z" },
    ]
  },
  {
    id: "usr-003",
    fullName: "Luis Ramírez",
    email: "luis.ramirez@municipalidad.gob.pe",
    role: "Supervisor",
    status: "Suspendido",
    phone: "965432109",
    position: "Coordinador de Trámites",
    area: "Administración",
    registrationDate: "2026-03-01T10:00:00Z",
    lastAccess: "2026-05-28T17:15:00Z",
    permissions: DEFAULT_PERMISSIONS.map(p => ({ ...p, assigned: p.code === "TRAMITES_MANAGE" || p.code === "REPORTS_VIEW" })),
    activities: [
      { id: "act-301", action: "Aprobación de trámite", details: "Se aprobó el expediente de subdivisión de lote EXP-002.", timestamp: "2026-05-28T16:40:00Z" },
    ]
  },
  {
    id: "usr-004",
    fullName: "María Fernández",
    email: "maria.fernandez@municipalidad.gob.pe",
    role: "Operador",
    status: "Activo",
    phone: "945678123",
    position: "Asistente de Mesa de Partes",
    area: "Fiscalización",
    registrationDate: "2026-04-12T08:00:00Z",
    lastAccess: "2026-05-31T11:00:00Z",
    permissions: DEFAULT_PERMISSIONS.map(p => ({ ...p, assigned: p.code === "TRAMITES_MANAGE" })),
    activities: [
      { id: "act-401", action: "Registro de trámite", details: "Ingreso del trámite de licencia de funcionamiento LIC-994.", timestamp: "2026-05-31T10:15:00Z" },
    ]
  },
  {
    id: "usr-005",
    fullName: "José Castillo",
    email: "jose.castillo@municipalidad.gob.pe",
    role: "Analista",
    status: "Bloqueado",
    phone: "923456789",
    position: "Analista de Presupuesto",
    area: "Tesorería",
    registrationDate: "2026-03-20T11:45:00Z",
    lastAccess: "2026-05-25T09:00:00Z",
    permissions: DEFAULT_PERMISSIONS.map(p => ({ ...p, assigned: p.code === "REPORTS_VIEW" })),
    activities: [
      { id: "act-501", action: "Generación de reporte", details: "Se exportó el reporte financiero del primer trimestre.", timestamp: "2026-05-25T08:45:00Z" },
    ]
  }
];

export const getInitialMockUsers = (): User[] => {
  const local = localStorage.getItem("sigdem_mock_users");
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return [...MOCK_USERS];
    }
  }
  return [...MOCK_USERS];
};

export const saveMockUsers = (users: User[]) => {
  localStorage.setItem("sigdem_mock_users", JSON.stringify(users));
};

import dayjs from "dayjs";
import type { Tramite } from "../types/tramite.types";

const now = dayjs();

export const mockTramites: Tramite[] = [
  {
    id: "TRM-2024-001",
    code: "EXP-4052",
    type: "Licencia Comercial",
    applicant: {
      name: "Juan Pérez",
      email: "juan.perez@empresa.com",
      document: "12345678"
    },
    description: "Solicitud de licencia de funcionamiento para nuevo local comercial en zona centro.",
    status: "Aprobado",
    priority: "Alta",
    createdAt: now.subtract(5, 'day').toISOString(),
    updatedAt: now.subtract(1, 'hour').toISOString(),
    responsibleArea: "Desarrollo Económico",
    assignedTo: "María López",
    history: [
      {
        id: "h1",
        action: "Trámite Registrado",
        timestamp: now.subtract(5, 'day').toISOString(),
        user: "Sistema",
        status: "Registrado"
      },
      {
        id: "h2",
        action: "Asignado a revisión",
        timestamp: now.subtract(4, 'day').toISOString(),
        user: "Admin",
        details: "Asignado a María López para revisión documental.",
        status: "En Revisión"
      },
      {
        id: "h3",
        action: "Aprobado",
        timestamp: now.subtract(1, 'hour').toISOString(),
        user: "María López",
        details: "Documentación conforme. Se emite certificado.",
        status: "Aprobado"
      }
    ],
    documents: [
      {
        id: "d1",
        name: "Formulario_Solicitud.pdf",
        type: "application/pdf",
        size: 1024 * 500, // 500kb
        uploadedAt: now.subtract(5, 'day').toISOString(),
        url: "#"
      },
      {
        id: "d2",
        name: "Planos_Local.pdf",
        type: "application/pdf",
        size: 1024 * 1024 * 2.5, // 2.5mb
        uploadedAt: now.subtract(5, 'day').toISOString(),
        url: "#"
      }
    ]
  },
  {
    id: "TRM-2024-002",
    code: "EXP-4053",
    type: "Permiso de Construcción",
    applicant: {
      name: "Constructora Inmobiliaria SAC",
      email: "proyectos@inmobiliaria.com",
      document: "20123456789"
    },
    description: "Permiso para edificación de proyecto multifamiliar de 5 pisos.",
    status: "En Revisión",
    priority: "Crítica",
    createdAt: now.subtract(2, 'day').toISOString(),
    updatedAt: now.subtract(2, 'day').toISOString(),
    responsibleArea: "Obras Privadas",
    assignedTo: "Carlos Ruiz",
    history: [
      {
        id: "h4",
        action: "Trámite Registrado",
        timestamp: now.subtract(2, 'day').toISOString(),
        user: "Sistema",
        status: "Registrado"
      },
      {
        id: "h5",
        action: "En Revisión Técnica",
        timestamp: now.subtract(1, 'day').toISOString(),
        user: "Carlos Ruiz",
        status: "En Revisión"
      }
    ],
    documents: [
      {
        id: "d3",
        name: "Planos_Estructurales.pdf",
        type: "application/pdf",
        size: 1024 * 1024 * 15,
        uploadedAt: now.subtract(2, 'day').toISOString(),
        url: "#"
      }
    ]
  },
  {
    id: "TRM-2024-003",
    code: "EXP-4054",
    type: "Certificado",
    applicant: {
      name: "Ana García",
      email: "ana.garcia@email.com",
    },
    description: "Certificado de parámetros urbanísticos.",
    status: "Observado",
    priority: "Media",
    createdAt: now.subtract(10, 'day').toISOString(),
    updatedAt: now.subtract(3, 'day').toISOString(),
    responsibleArea: "Planeamiento Urbano",
    assignedTo: "Roberto Sánchez",
    history: [
      {
        id: "h6",
        action: "Trámite Registrado",
        timestamp: now.subtract(10, 'day').toISOString(),
        user: "Sistema",
        status: "Registrado"
      },
      {
        id: "h7",
        action: "Documentación Incompleta",
        timestamp: now.subtract(3, 'day').toISOString(),
        user: "Roberto Sánchez",
        details: "Falta copia de título de propiedad legible.",
        status: "Observado"
      }
    ],
    documents: [
      {
        id: "d4",
        name: "Recibo_Pago.jpg",
        type: "image/jpeg",
        size: 1024 * 300,
        uploadedAt: now.subtract(10, 'day').toISOString(),
        url: "#"
      }
    ]
  },
  {
    id: "TRM-2024-004",
    code: "EXP-4055",
    type: "Reclamo",
    applicant: {
      name: "Vecino Indignado",
      email: "vecino@vecino.com",
    },
    description: "Reclamo por ruidos molestos en la vía pública.",
    status: "Registrado",
    priority: "Alta",
    createdAt: now.subtract(1, 'hour').toISOString(),
    updatedAt: now.subtract(1, 'hour').toISOString(),
    responsibleArea: "Seguridad Ciudadana",
    history: [
      {
        id: "h8",
        action: "Trámite Registrado",
        timestamp: now.subtract(1, 'hour').toISOString(),
        user: "Sistema",
        status: "Registrado"
      }
    ],
    documents: []
  },
  {
    id: "TRM-2024-005",
    code: "EXP-4056",
    type: "Licencia Comercial",
    applicant: {
      name: "Bodega Don Pepe",
      email: "pepe@bodega.com",
    },
    description: "Renovación de licencia de funcionamiento anual.",
    status: "Rechazado",
    priority: "Baja",
    createdAt: now.subtract(15, 'day').toISOString(),
    updatedAt: now.subtract(1, 'day').toISOString(),
    responsibleArea: "Desarrollo Económico",
    assignedTo: "María López",
    history: [
      {
        id: "h9",
        action: "Trámite Registrado",
        timestamp: now.subtract(15, 'day').toISOString(),
        user: "Sistema",
        status: "Registrado"
      },
      {
        id: "h10",
        action: "Rechazado por deudas",
        timestamp: now.subtract(1, 'day').toISOString(),
        user: "María López",
        details: "El contribuyente mantiene deudas tributarias pendientes que impiden la renovación.",
        status: "Rechazado"
      }
    ],
    documents: []
  }
];

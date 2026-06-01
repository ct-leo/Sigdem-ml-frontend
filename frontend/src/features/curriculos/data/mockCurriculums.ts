import type { Curriculum } from "../types/curriculum.types";

export const MOCK_CURRICULUMS: Curriculum[] = [
  {
    id: "cv-001",
    candidateName: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+51 987 654 321",
    city: "Lima, Perú",
    registrationDate: "2026-05-22T10:15:30Z",
    experienceYears: 4,
    compatibilityPercentage: 96,
    status: "Preseleccionado",
    jobTitleAssociated: "Analista de Sistemas de Información",
    codeAssociated: "CONV-2026-001",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Git", "Clean Architecture"],
    experiences: [
      {
        company: "Tecnologías Digitales S.A.C.",
        position: "Desarrollador Full Stack Senior",
        period: "2024 - Presente",
        description: "Liderazgo en la migración de plataformas heredadas a microservicios en Node.js, implementando interfaces dinámicas utilizando React, TypeScript y TailwindCSS.",
      },
      {
        company: "Consultoría de Software S.A.",
        position: "Desarrollador Frontend",
        period: "2022 - 2024",
        description: "Construcción de tableros de visualización de datos gubernamentales, optimizando tiempos de carga de interfaces en un 35%. Interacción directa con bases PostgreSQL.",
      },
    ],
    educations: [
      {
        institution: "Universidad Nacional de Ingeniería",
        career: "Ingeniería de Sistemas",
        academicLevel: "Titulado Universitario",
        year: "2022",
      },
    ],
    certifications: [
      {
        name: "SCRUM Master Certified",
        entity: "Scrum Alliance",
        date: "2023",
      },
      {
        name: "ITIL 4 Foundation",
        entity: "AXELOS",
        date: "2022",
      },
    ],
    nlpInsight: {
      skillsDetected: ["React", "TypeScript", "Node.js", "PostgreSQL", "Microservicios", "Liderazgo"],
      keywordsIdentified: ["desarrollo frontend", "optimización", "microservicios", "ingeniería de sistemas"],
      compatibilityScore: 96,
      technologiesFound: ["React", "Node.js", "PostgreSQL", "Docker", "TailwindCSS"],
      certificationsCount: 2,
      experiencesCount: 2,
    },
    timeline: [
      { label: "Registro del CV", date: "22/05/2026", completed: true, active: false },
      { label: "Procesado OCR / NLP", date: "22/05/2026", completed: true, active: false },
      { label: "Evaluación Técnica", date: "25/05/2026", completed: true, active: false },
      { label: "Preselección", date: "28/05/2026", completed: true, active: true },
      { label: "Aprobación Final", date: "Pendiente", completed: false, active: false },
    ],
  },
  {
    id: "cv-002",
    candidateName: "Ana Torres",
    email: "ana.torres@email.com",
    phone: "+51 912 345 678",
    city: "Arequipa, Perú",
    registrationDate: "2026-05-29T11:00:00Z",
    experienceYears: 3,
    compatibilityPercentage: 88,
    status: "En Revisión",
    jobTitleAssociated: "Analista de Recursos Humanos y Clima Laboral",
    codeAssociated: "CONV-2026-005",
    skills: ["Gestión del Talento", "Clima Laboral", "Psicología Organizacional", "Excel Intermedio", "Pruebas Psicométricas"],
    experiences: [
      {
        company: "Consorcio Industrial del Sur",
        position: "Asistente de Recursos Humanos",
        period: "2023 - Presente",
        description: "Ejecución del plan anual de clima organizacional, gestión de legajos del personal, inducción corporativa y evaluaciones de desempeño psicométricas.",
      },
    ],
    educations: [
      {
        institution: "Universidad Nacional de San Agustín",
        career: "Psicología Organizacional",
        academicLevel: "Bachiller Universitario",
        year: "2023",
      },
    ],
    certifications: [
      {
        name: "Especialización en Gestión del Talento Humano",
        entity: "Cámara de Comercio",
        date: "2024",
      },
    ],
    nlpInsight: {
      skillsDetected: ["Gestión del Talento", "Clima Laboral", "Inducción", "Evaluación de Desempeño"],
      keywordsIdentified: ["recursos humanos", "clima organizacional", "psicología organizacional", "evaluación"],
      compatibilityScore: 88,
      technologiesFound: ["Excel", "Software ATS", "Google Suite"],
      certificationsCount: 1,
      experiencesCount: 1,
    },
    timeline: [
      { label: "Registro del CV", date: "29/05/2026", completed: true, active: false },
      { label: "Procesado OCR / NLP", date: "29/05/2026", completed: true, active: false },
      { label: "Evaluación Técnica", date: "30/05/2026", completed: true, active: true },
      { label: "Preselección", date: "Pendiente", completed: false, active: false },
      { label: "Aprobación Final", date: "Pendiente", completed: false, active: false },
    ],
  },
  {
    id: "cv-003",
    candidateName: "Luis Mendoza",
    email: "luis.mendoza@email.com",
    phone: "+51 965 432 109",
    city: "Trujillo, Perú",
    registrationDate: "2026-05-15T09:45:00Z",
    experienceYears: 5,
    compatibilityPercentage: 75,
    status: "Aprobado",
    jobTitleAssociated: "Inspector Municipal de Tránsito y Fiscalización",
    codeAssociated: "CONV-2026-004",
    skills: ["Reglamento de Tránsito", "Manejo de Conflictos", "Seguridad Vial", "Primeros Auxilios", "Licencia A-IIa"],
    experiences: [
      {
        company: "Consorcio de Transportes del Norte",
        position: "Coordinador de Operaciones Viales",
        period: "2021 - Presente",
        description: "Supervisión en campo de rutas de transporte urbano, gestión de incidencias, capacitación en seguridad vial a choferes y manejo de conflictos ciudadanos.",
      },
    ],
    educations: [
      {
        institution: "Instituto Técnico del Norte",
        career: "Técnico en Seguridad y Prevención de Riesgos",
        academicLevel: "T Técnico Titulado",
        year: "2020",
      },
    ],
    certifications: [
      {
        name: "Licencia de Conducir A-IIa",
        entity: "MTC (Ministerio de Transportes)",
        date: "2019",
      },
      {
        name: "Curso Avanzado de Manejo de Conflictos Sociales",
        entity: "Gobierno Regional",
        date: "2022",
      },
    ],
    nlpInsight: {
      skillsDetected: ["Seguridad Vial", "Manejo de Conflictos", "Tránsito", "Coordinación de Campo"],
      keywordsIdentified: ["transporte urbano", "campo", "conflictos", "seguridad vial"],
      compatibilityScore: 75,
      technologiesFound: ["GPS Tracking", "Excel"],
      certificationsCount: 2,
      experiencesCount: 1,
    },
    timeline: [
      { label: "Registro del CV", date: "15/05/2026", completed: true, active: false },
      { label: "Procesado OCR / NLP", date: "15/05/2026", completed: true, active: false },
      { label: "Evaluación Técnica", date: "18/05/2026", completed: true, active: false },
      { label: "Preselección", date: "20/05/2026", completed: true, active: false },
      { label: "Aprobación Final", date: "24/05/2026", completed: true, active: true },
    ],
  },
  {
    id: "cv-004",
    candidateName: "Carla Ramírez",
    email: "carla.ramirez@email.com",
    phone: "+51 945 678 123",
    city: "Lima, Perú",
    registrationDate: "2026-05-26T14:30:00Z",
    experienceYears: 2,
    compatibilityPercentage: 65,
    status: "Descartado",
    jobTitleAssociated: "Asistente Administrativo de Mesa de Partes",
    codeAssociated: "CONV-2026-003",
    skills: ["Gestión Documental", "Atención al Ciudadano", "Redacción Administrativa", "Digitación", "Excel Básico"],
    experiences: [
      {
        company: "Estudio Jurídico Alianza",
        position: "Recepcionista y Auxiliar Legal",
        period: "2024 - 2026",
        description: "Recepción de escritos y notificaciones legales, foliado de expedientes físicos, digitación de cartas y archivo general de documentación del estudio.",
      },
    ],
    educations: [
      {
        institution: "Instituto de Secretariado Superior",
        career: "Secretariado Ejecutivo",
        academicLevel: "Técnico Egresado",
        year: "2024",
      },
    ],
    certifications: [],
    nlpInsight: {
      skillsDetected: ["Digitación", "Redacción Administrativa", "Recepción de Escritos"],
      keywordsIdentified: ["estudio jurídico", "expedientes", "archivo", "secretariado ejecutivo"],
      compatibilityScore: 65,
      technologiesFound: ["Word", "Excel"],
      certificationsCount: 0,
      experiencesCount: 1,
    },
    timeline: [
      { label: "Registro del CV", date: "26/05/2026", completed: true, active: false },
      { label: "Procesado OCR / NLP", date: "26/05/2026", completed: true, active: false },
      { label: "Evaluación Técnica", date: "28/05/2026", completed: true, active: false },
      { label: "Resultado Descarte", date: "29/05/2026", completed: true, active: true },
      { label: "Aprobación Final", date: "Rechazado", completed: false, active: false },
    ],
  },
];
export const getInitialMockCurriculums = (): Curriculum[] => {
  const local = localStorage.getItem("sigdem_mock_curriculums");
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return [...MOCK_CURRICULUMS];
    }
  }
  return [...MOCK_CURRICULUMS];
};

export const saveMockCurriculums = (cvs: Curriculum[]) => {
  localStorage.setItem("sigdem_mock_curriculums", JSON.stringify(cvs));
};

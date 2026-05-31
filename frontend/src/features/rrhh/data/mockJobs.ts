import type { Job } from "../types/job.types";

export const INITIAL_MOCK_JOBS: Job[] = [
  {
    id: "job-001",
    code: "CONV-2026-001",
    title: "Analista de Sistemas de Información",
    area: "Tecnologías de Información",
    description: "Responsable del soporte técnico, desarrollo, optimización e integración de las bases de datos y aplicativos internos del municipio, incluyendo el sistema SIGDEM-ML.",
    vacancies: 2,
    requirements: {
      experienceYears: 3,
      academicLevel: "Bachiller o Titulado en Ingeniería de Sistemas o Software",
      certifications: ["ITIL Foundation", "SCRUM Master"],
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    },
    publishedAt: "2026-05-20T08:00:00Z",
    closedAt: "2026-06-15T18:00:00Z",
    status: "Activa",
    totalApplicationsCount: 18,
  },
  {
    id: "job-002",
    code: "CONV-2026-002",
    title: "Especialista en Tesorería y Fondos Públicos",
    area: "Tesorería",
    description: "Gestión de caja, conciliaciones bancarias, control presupuestario y elaboración de informes de ejecución financiera para el área tributaria de la municipalidad.",
    vacancies: 1,
    requirements: {
      experienceYears: 4,
      academicLevel: "Licenciado en Contabilidad, Economía o Administración",
      certifications: ["SIAF (Sistema de Administración Financiera)", "Certificación del OSCE"],
      skills: ["Excel Avanzado", "Análisis Financiero", "Normativa de Presupuesto Público"],
    },
    publishedAt: "2026-05-22T08:00:00Z",
    closedAt: "2026-06-10T18:00:00Z",
    status: "Activa",
    totalApplicationsCount: 12,
  },
  {
    id: "job-003",
    code: "CONV-2026-003",
    title: "Asistente Administrativo de Mesa de Partes",
    area: "Administración",
    description: "Recepción, registro, clasificación y derivación de expedientes físicos y digitales que ingresan al municipio mediante mesa de partes virtual y física.",
    vacancies: 3,
    requirements: {
      experienceYears: 1,
      academicLevel: "Técnico o Egresado en Administración o Archivística",
      certifications: ["Curso en Gestión Documental o Trámite Documentario"],
      skills: ["Digitación Rápida", "Atención al Ciudadano", "Herramientas de Oficina"],
    },
    publishedAt: "2026-05-25T08:00:00Z",
    closedAt: "2026-06-20T18:00:00Z",
    status: "Borrador",
    totalApplicationsCount: 0,
  },
  {
    id: "job-004",
    code: "CONV-2026-004",
    title: "Inspector Municipal de Tránsito y Fiscalización",
    area: "Fiscalización",
    description: "Supervisión del cumplimiento de las ordenanzas municipales relativas al transporte público, orden vial y comercio informal en el distrito.",
    vacancies: 5,
    requirements: {
      experienceYears: 2,
      academicLevel: "Secundaria Completa con Cursos de Fiscalización o Tránsito",
      certifications: ["Licencia de Conducir Moto o Auto activa"],
      skills: ["Manejo de Conflictos", "Primeros Auxilios", "Comunicación Asertiva"],
    },
    publishedAt: "2026-05-01T08:00:00Z",
    closedAt: "2026-05-25T18:00:00Z",
    status: "Cerrada",
    totalApplicationsCount: 42,
  },
  {
    id: "job-005",
    code: "CONV-2026-005",
    title: "Analista de Recursos Humanos y Clima Laboral",
    area: "Recursos Humanos",
    description: "Coordinación y ejecución de los planes de inducción, capacitaciones, evaluación del desempeño y clima laboral de los trabajadores del municipio.",
    vacancies: 1,
    requirements: {
      experienceYears: 3,
      academicLevel: "Bachiller en Psicología Organizacional, Administración o RRHH",
      certifications: ["Especialización en Gestión del Talento Humano"],
      skills: ["Evaluaciones Psicométricas", "Microsoft Office", "Diseño de Talleres"],
    },
    publishedAt: "2026-05-28T08:00:00Z",
    closedAt: "2026-06-18T18:00:00Z",
    status: "Activa",
    totalApplicationsCount: 9,
  },
];
export const getInitialMockJobs = (): Job[] => {
  const local = localStorage.getItem("sigdem_mock_jobs");
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return [...INITIAL_MOCK_JOBS];
    }
  }
  return [...INITIAL_MOCK_JOBS];
};

export const saveMockJobs = (jobs: Job[]) => {
  localStorage.setItem("sigdem_mock_jobs", JSON.stringify(jobs));
};

import type { CandidateRanking, RankingStatistics, RankingInsight } from "../types/ranking.types";

export const MOCK_RANKINGS: CandidateRanking[] = [
  {
    id: "rank-001",
    candidateName: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+51 987 654 321",
    city: "Lima, Perú",
    avatarUrl: "",
    jobTitleAssociated: "Analista de Sistemas de Información",
    codeAssociated: "CONV-2026-001",
    experienceYears: 6,
    academicLevel: "Titulado Universitario",
    certifications: ["SCRUM Master Certified", "ITIL 4 Foundation"],
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Clean Architecture"],
    compatibilityPercentage: 96,
    scoreIA: 97,
    position: "1° Lugar",
    status: "Preseleccionado",
    registrationDate: "2026-05-22T10:15:30Z",
  },
  {
    id: "rank-002",
    candidateName: "Ana Torres",
    email: "ana.torres@email.com",
    phone: "+51 912 345 678",
    city: "Arequipa, Perú",
    avatarUrl: "",
    jobTitleAssociated: "Analista de Recursos Humanos y Clima Laboral",
    codeAssociated: "CONV-2026-005",
    experienceYears: 4,
    academicLevel: "Bachiller Universitario",
    certifications: ["Especialización en Gestión del Talento Humano"],
    skills: ["Gestión del Talento", "Clima Laboral", "Psicología Organizacional", "Excel Intermedio"],
    compatibilityPercentage: 92,
    scoreIA: 94,
    position: "2° Lugar",
    status: "En Revisión",
    registrationDate: "2026-05-29T11:00:00Z",
  },
  {
    id: "rank-003",
    candidateName: "Luis Mendoza",
    email: "luis.mendoza@email.com",
    phone: "+51 965 432 109",
    city: "Trujillo, Perú",
    avatarUrl: "",
    jobTitleAssociated: "Inspector Municipal de Tránsito y Fiscalización",
    codeAssociated: "CONV-2026-004",
    experienceYears: 5,
    academicLevel: "Técnico Titulado",
    certifications: ["Licencia de Conducir A-IIa", "Curso Avanzado de Manejo de Conflictos Sociales"],
    skills: ["Reglamento de Tránsito", "Manejo de Conflictos", "Seguridad Vial", "Primeros Auxilios"],
    compatibilityPercentage: 89,
    scoreIA: 91,
    position: "3° Lugar",
    status: "Aprobado",
    registrationDate: "2026-05-15T09:45:00Z",
  },
  {
    id: "rank-004",
    candidateName: "Carla Ramírez",
    email: "carla.ramirez@email.com",
    phone: "+51 945 678 123",
    city: "Lima, Perú",
    avatarUrl: "",
    jobTitleAssociated: "Asistente Administrativo de Mesa de Partes",
    codeAssociated: "CONV-2026-003",
    experienceYears: 3,
    academicLevel: "Técnico Egresado",
    certifications: ["Curso de Gestión Documental Archivo Central"],
    skills: ["Gestión Documental", "Atención al Ciudadano", "Redacción Administrativa", "Digitación"],
    compatibilityPercentage: 86,
    scoreIA: 88,
    position: "Finalista",
    status: "En Revisión",
    registrationDate: "2026-05-26T14:30:00Z",
  },
  {
    id: "rank-005",
    candidateName: "Fernando Rojas",
    email: "fernando.rojas@email.com",
    phone: "+51 923 456 789",
    city: "Callao, Perú",
    avatarUrl: "",
    jobTitleAssociated: "Especialista en Compras Públicas SEACE",
    codeAssociated: "CONV-2026-002",
    experienceYears: 4,
    academicLevel: "Bachiller Universitario",
    certifications: ["Certificación Organismo Supervisor OSCE Básica"],
    skills: ["Contrataciones del Estado", "Ley de Contrataciones", "Manejo SEACE", "Excel Avanzado"],
    compatibilityPercentage: 83,
    scoreIA: 85,
    position: "Finalista",
    status: "En Revisión",
    registrationDate: "2026-05-20T08:15:00Z",
  }
];

export const MOCK_STATISTICS: RankingStatistics = {
  totalEvaluated: 142,
  averageCompatibility: 88.5,
  topScore: 97,
  highlightedCount: 18,
  analyzedJobsCount: 5,
};

export const MOCK_INSIGHT: RankingInsight = {
  generalAverage: 82.4,
  bestSkillDetected: "React & TypeScript / Gestión Pública",
  frequentTechnology: "Zustand, TailwindCSS, SEACE",
  averageExperienceYears: 4.4,
  overallCompatibility: 86.8,
};

export const getInitialMockRankings = (): CandidateRanking[] => {
  const local = localStorage.getItem("sigdem_mock_rankings");
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return [...MOCK_RANKINGS];
    }
  }
  return [...MOCK_RANKINGS];
};

export const saveMockRankings = (rankings: CandidateRanking[]) => {
  localStorage.setItem("sigdem_mock_rankings", JSON.stringify(rankings));
};

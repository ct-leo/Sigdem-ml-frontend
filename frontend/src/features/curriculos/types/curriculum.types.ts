export type CandidateStatus = "Pendiente" | "En Revisión" | "Preseleccionado" | "Aprobado" | "Descartado";

export interface CandidateExperience {
  company: string;
  position: string;
  period: string; // e.g. "2022 - 2025"
  description: string;
}

export interface CandidateEducation {
  institution: string;
  career: string;
  academicLevel: string; // e.g. "Bachiller", "Titulado"
  year: string; // e.g. "2021"
}

export interface CandidateCertification {
  name: string;
  entity: string;
  date: string; // e.g. "2023"
}

export interface NLPInsight {
  skillsDetected: string[];
  keywordsIdentified: string[];
  compatibilityScore: number; // percentage e.g. 96
  technologiesFound: string[];
  certificationsCount: number;
  experiencesCount: number;
}

export interface CurriculumTimelineStep {
  label: string;
  date: string;
  completed: boolean;
  active: boolean;
}

export interface Curriculum {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  city: string;
  registrationDate: string; // ISO String
  experienceYears: number;
  compatibilityPercentage: number; // e.g. 96
  status: CandidateStatus;
  jobTitleAssociated: string; // e.g. "Analista de Sistemas"
  codeAssociated: string; // Convocatoria Code, e.g. "CONV-2026-001"
  skills: string[];
  experiences: CandidateExperience[];
  educations: CandidateEducation[];
  certifications: CandidateCertification[];
  nlpInsight: NLPInsight;
  timeline: CurriculumTimelineStep[];
}

export interface CurriculumStats {
  totalProcessed: number;
  averageCompatibility: number; // percentage
  approved: number;
  pending: number;
  highlighted: number; // Candidates with compatibility > 90%
}

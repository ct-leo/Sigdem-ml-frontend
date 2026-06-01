export type CandidatePosition = "1° Lugar" | "2° Lugar" | "3° Lugar" | "Finalista";

export interface CandidateRanking {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  city: string;
  avatarUrl?: string;
  jobTitleAssociated: string;
  codeAssociated: string;
  experienceYears: number;
  academicLevel: string;
  certifications: string[];
  skills: string[];
  compatibilityPercentage: number;
  scoreIA: number; // 0 to 100
  position: CandidatePosition;
  status: "Preseleccionado" | "Aprobado" | "En Revisión" | "Descartado";
  registrationDate: string; // ISO String
}

export interface RankingStatistics {
  totalEvaluated: number;
  averageCompatibility: number;
  topScore: number;
  highlightedCount: number;
  analyzedJobsCount: number;
}

export interface RankingInsight {
  generalAverage: number;
  bestSkillDetected: string;
  frequentTechnology: string;
  averageExperienceYears: number;
  overallCompatibility: number;
}

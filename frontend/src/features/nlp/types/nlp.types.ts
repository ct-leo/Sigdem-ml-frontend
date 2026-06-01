export interface CVMatchRequest {
  cv_id: number;
  job_id: number;
}

export interface CVMatchResponse {
  cv_id: number;
  job_id: number;
  candidato: string;
  convocatoria: string;
  compatibilidad: number;
  resultado: string;
}

export interface RankingCandidate {
  cv_id: number;
  candidato: string;
  correo: string;
  telefono: string;
  compatibilidad: number;
  resultado: string;
}

export interface RankingResponse {
  job_id: number;
  convocatoria: string;
  total_candidatos: number;
  ranking: RankingCandidate[];
}

import type { Curriculum, CurriculumStats, CandidateStatus } from "../types/curriculum.types";
import { getInitialMockCurriculums, saveMockCurriculums } from "../data/mockCurriculums";

const DELAY = 600;

export const curriculumsService = {
  getCurriculums: async (): Promise<Curriculum[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getInitialMockCurriculums());
      }, DELAY);
    });
  },

  getCurriculumById: async (id: string): Promise<Curriculum | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cvs = getInitialMockCurriculums();
        const found = cvs.find((c) => c.id === id) || null;
        resolve(found);
      }, DELAY);
    });
  },

  updateCurriculumStatus: async (id: string, status: CandidateStatus): Promise<Curriculum> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cvs = getInitialMockCurriculums();
        const idx = cvs.findIndex((c) => c.id === id);
        if (idx === -1) {
          reject(new Error("Currículo no encontrado"));
          return;
        }

        const updatedCV: Curriculum = {
          ...cvs[idx],
          status,
        };

        const updated = [...cvs];
        updated[idx] = updatedCV;
        saveMockCurriculums(updated);
        resolve(updatedCV);
      }, DELAY);
    });
  },

  getCurriculumStats: async (): Promise<CurriculumStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cvs = getInitialMockCurriculums();
        const totalProcessed = cvs.length;
        const approved = cvs.filter((c) => c.status === "Aprobado").length;
        const pending = cvs.filter((c) => c.status === "Pendiente" || c.status === "En Revisión").length;
        const highlighted = cvs.filter((c) => c.compatibilityPercentage >= 90).length;

        // Sum and calculate average compatibility
        const totalComp = cvs.reduce((sum, c) => sum + c.compatibilityPercentage, 0);
        const averageCompatibility = totalProcessed > 0 ? Math.round(totalComp / totalProcessed) : 0;

        resolve({
          totalProcessed,
          averageCompatibility,
          approved,
          pending,
          highlighted,
        });
      }, DELAY);
    });
  },
};

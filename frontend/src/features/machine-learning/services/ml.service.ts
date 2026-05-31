import type { MLDataPayload } from "../types/ml.types";
import { MOCK_ML_DATA } from "../data/mockMLData";

const DELAY = 600;

export const mlService = {
  getMLData: async (): Promise<MLDataPayload> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...MOCK_ML_DATA });
      }, DELAY);
    });
  },
};

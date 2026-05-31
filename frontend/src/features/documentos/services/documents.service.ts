import type { Document, DocumentStats } from "../types/document.types";
import { MOCK_DOCUMENTS } from "../data/mockDocuments";

const DELAY = 600;

export const documentsService = {
  getDocuments: async (): Promise<Document[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_DOCUMENTS]);
      }, DELAY);
    });
  },

  getDocumentById: async (id: string): Promise<Document | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doc = MOCK_DOCUMENTS.find((d) => d.id === id) || null;
        resolve(doc);
      }, DELAY);
    });
  },

  getDocumentStats: async (): Promise<DocumentStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = MOCK_DOCUMENTS.length;
        const pdfs = MOCK_DOCUMENTS.filter((d) => d.type === "PDF").length;
        const processedOcr = MOCK_DOCUMENTS.filter((d) => d.statusOcr === "Procesado").length;
        const pendingOcr = MOCK_DOCUMENTS.filter((d) => d.statusOcr === "Pendiente" || d.statusOcr === "En Proceso").length;
        
        // Sum total space in bytes
        const totalBytes = MOCK_DOCUMENTS.reduce((sum, d) => sum + d.size, 0);
        // Format to MB
        const spaceUsed = `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;

        resolve({
          total,
          pdfs,
          processedOcr,
          pendingOcr,
          spaceUsed,
        });
      }, DELAY);
    });
  },
};

import { useMutation } from "@tanstack/react-query";
import { documentsService } from "../services/documents.service";
import { toast } from "sonner";

export const useDownloadDocument = () => {
  return useMutation({
    mutationFn: async ({ id, nombre_original }: { id: number; nombre_original: string }) => {
      const blob = await documentsService.downloadDocument(id);
      return { blob, nombre_original };
    },
    onSuccess: ({ blob, nombre_original }) => {
      // Create a blob URL
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", nombre_original);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success(`Descarga de ${nombre_original} iniciada`);
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al descargar el documento";
      toast.error(detail);
    },
  });
};

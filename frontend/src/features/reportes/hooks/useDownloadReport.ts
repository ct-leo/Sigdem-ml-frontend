import { useMutation } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";
import { downloadBlobFile } from "../utils/download.utils";
import { toast } from "sonner";

export type ReportCategory = "tramites" | "documents" | "rrhh" | "notifications";

export const useDownloadReport = () => {
  return useMutation({
    mutationFn: async (category: ReportCategory) => {
      let blob: Blob;
      let filename = "reporte.pdf";

      switch (category) {
        case "tramites":
          blob = await reportsService.downloadTramitesPDF();
          filename = "reporte_tramites_sigdem.pdf";
          break;
        case "documents":
          blob = await reportsService.downloadDocumentsPDF();
          filename = "reporte_documental_sigdem.pdf";
          break;
        case "rrhh":
          blob = await reportsService.downloadRRHHPDF();
          filename = "reporte_rrhh_sigdem.pdf";
          break;
        case "notifications":
          blob = await reportsService.downloadNotificationsPDF();
          filename = "reporte_notificaciones_sigdem.pdf";
          break;
        default:
          throw new Error("Categoría de reporte inválida");
      }

      return { blob, filename };
    },
    onSuccess: ({ blob, filename }) => {
      downloadBlobFile(blob, filename);
      toast.success("Reporte descargado correctamente");
    },
    onError: () => {
      toast.error("Error al descargar reporte");
    },
  });
};
export default useDownloadReport;

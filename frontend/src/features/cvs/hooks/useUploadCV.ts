import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cvsService } from "../services/cvs.service";
import { CVS_KEYS } from "../queryKeys/cvs.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { UploadCVDto } from "../types/cv.types";

export const useUploadCV = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: (data: UploadCVDto) =>
      cvsService.uploadCV(data, (pct) => setUploadProgress(pct)),
    onSuccess: (cv) => {
      queryClient.invalidateQueries({ queryKey: CVS_KEYS.all });
      setUploadProgress(0);
      toast.success("Currículo cargado correctamente");
      addNotification(
        "Currículo Cargado",
        `El CV de ${cv.nombre_candidato} ha sido registrado en el sistema.`,
        "success",
        "RRHH",
        `/curriculos/${cv.id}`
      );
    },
    onError: (error: any) => {
      setUploadProgress(0);
      const detail =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Error al cargar el currículo";
      const status = error.response?.status;
      if (status === 413) {
        toast.error("El archivo supera el límite de tamaño permitido (20 MB)");
      } else if (status === 422) {
        toast.error("Datos del formulario inválidos. Verifique los campos.");
      } else {
        toast.error(detail);
      }
    },
  });

  return { ...mutation, uploadProgress };
};

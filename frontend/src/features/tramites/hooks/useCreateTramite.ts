import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";
import { TRAMITES_KEYS } from "../queryKeys/tramites.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { CreateTramiteDto } from "../types/tramite.types";

export const useCreateTramite = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (data: CreateTramiteDto) => tramitesService.createTramite(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.all });
      toast.success("Trámite registrado exitosamente");
      addNotification(
        "Trámite Registrado",
        `Se ha creado el expediente ${data.codigo} para el solicitante ${data.correo_solicitante}.`,
        "success",
        "Trámites",
        `/tramites/${data.id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al registrar el trámite";
      toast.error(detail);
    },
  });
};

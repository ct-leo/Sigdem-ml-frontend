import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";
import { TRAMITES_KEYS } from "../queryKeys/tramites.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { TramiteStatus } from "../types/tramite.types";

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { estado: TramiteStatus; comentario: string } }) => 
      tramitesService.changeStatus(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.history(data.id) });
      toast.success(`Estado cambiado a ${data.estado} exitosamente`);
      addNotification(
        "Estado del Trámite Cambiado",
        `El expediente ${data.codigo} ahora se encuentra en estado: ${data.estado}.`,
        "info",
        "Trámites",
        `/tramites/${data.id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al cambiar estado del trámite";
      toast.error(detail);
    },
  });
};

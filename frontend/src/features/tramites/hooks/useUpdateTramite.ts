import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";
import { TRAMITES_KEYS } from "../queryKeys/tramites.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { UpdateTramiteDto } from "../types/tramite.types";

export const useUpdateTramite = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTramiteDto }) => 
      tramitesService.updateTramite(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.detail(data.id) });
      toast.success("Trámite actualizado correctamente");
      addNotification(
        "Trámite Actualizado",
        `Se han guardado los cambios en el expediente ${data.codigo}.`,
        "info",
        "Trámites",
        `/tramites/${data.id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al actualizar el trámite";
      toast.error(detail);
    },
  });
};

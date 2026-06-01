import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";
import { TRAMITES_KEYS } from "../queryKeys/tramites.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useAssignAnalyst = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { analista_id: number; comentario: string } }) => 
      tramitesService.assignAnalyst(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: TRAMITES_KEYS.history(data.id) });
      toast.success("Analista asignado exitosamente");
      addNotification(
        "Analista Asignado",
        `Se ha asignado un nuevo analista al expediente ${data.codigo}.`,
        "info",
        "Trámites",
        `/tramites/${data.id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al asignar analista";
      toast.error(detail);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";
import { JOBS_KEYS } from "../queryKeys/jobs.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (id: number) => jobsService.deleteJob(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: JOBS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: JOBS_KEYS.detail(id) });
      
      toast.success("Convocatoria eliminada correctamente");
      addNotification(
        "Convocatoria Eliminada",
        `La convocatoria con ID #${id} ha sido removida del sistema.`,
        "warning",
        "RRHH",
        "/convocatorias"
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al eliminar la convocatoria";
      toast.error(detail);
    },
  });
};

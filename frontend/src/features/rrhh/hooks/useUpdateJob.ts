import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";
import { JOBS_KEYS } from "../queryKeys/jobs.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { UpdateJobDto } from "../types/job.types";

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateJobDto }) => 
      jobsService.updateJob(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: JOBS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: JOBS_KEYS.detail(variables.id) });
      
      toast.success("Convocatoria actualizada correctamente");
      addNotification(
        "Convocatoria Actualizada",
        `La convocatoria ${data.titulo} ha sido modificada satisfactoriamente.`,
        "info",
        "RRHH",
        `/convocatorias/${data.id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al actualizar la convocatoria";
      toast.error(detail);
    },
  });
};

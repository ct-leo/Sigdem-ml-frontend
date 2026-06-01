import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsService } from "../services/jobs.service";
import { JOBS_KEYS } from "../queryKeys/jobs.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { CreateJobDto } from "../types/job.types";

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (data: CreateJobDto) => jobsService.createJob(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: JOBS_KEYS.all });
      toast.success("Convocatoria creada correctamente");
      addNotification(
        "Convocatoria Creada",
        `La convocatoria para el puesto ${data.titulo} ha sido publicada exitosamente.`,
        "success",
        "RRHH",
        `/convocatorias/${data.id}`
      );
    },
    onError: (error: any) => {
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al crear la convocatoria";
      toast.error(detail);
    },
  });
};

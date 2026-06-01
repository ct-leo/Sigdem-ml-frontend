import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cvsService } from "../services/cvs.service";
import { CVS_KEYS } from "../queryKeys/cvs.keys";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useDeleteCV = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  return useMutation({
    mutationFn: (id: number) => cvsService.deleteCV(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: CVS_KEYS.all });
      queryClient.invalidateQueries({ queryKey: CVS_KEYS.detail(id) });
      toast.success("Currículo eliminado correctamente");
      addNotification(
        "Currículo Eliminado",
        `El expediente CV-${id} fue removido del portal ATS.`,
        "warning",
        "RRHH",
        "/curriculos"
      );
    },
    onError: (error: any) => {
      const detail =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Error al eliminar el currículo";
      toast.error(detail);
    },
  });
};

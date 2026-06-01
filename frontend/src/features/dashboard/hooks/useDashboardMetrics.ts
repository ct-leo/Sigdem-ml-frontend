import { useDashboardSummary } from "./useDashboardSummary";
import { useTramitesByStatus } from "./useTramitesByStatus";
import { useTramitesByPriority } from "./useTramitesByPriority";
import { useRRHHDashboard } from "./useRRHHDashboard";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useDashboardMetrics = () => {
  const summary = useDashboardSummary();
  const status = useTramitesByStatus();
  const priorities = useTramitesByPriority();
  const rrhh = useRRHHDashboard();

  const addNotification = useNotificationStore((s) => s.addNotification);

  const isSuccess =
    summary.isSuccess && status.isSuccess && priorities.isSuccess && rrhh.isSuccess;
  const isLoading =
    summary.isLoading || status.isLoading || priorities.isLoading || rrhh.isLoading;
  const isError =
    summary.isError || status.isError || priorities.isError || rrhh.isError;

  return {
    summary,
    status,
    priorities,
    rrhh,
    isLoading,
    isError,
    isSuccess,
    refetchAll: async () => {
      const toastId = toast.loading("Sincronizando métricas municipales...", {
        description: "Obteniendo datos actualizados del servidor..."
      });
      try {
        await Promise.all([
          summary.refetch(),
          status.refetch(),
          priorities.refetch(),
          rrhh.refetch(),
        ]);
        
        toast.success("Dashboard sincronizado correctamente", {
          id: toastId,
          description: "Las métricas municipales han sido sincronizadas."
        });

        addNotification(
          "Métricas Sincronizadas",
          "El Dashboard Ejecutivo y las estadísticas municipales han sido sincronizadas correctamente por el usuario.",
          "success",
          "Sistema",
          "/dashboard"
        );
      } catch (err) {
        toast.error("Error al sincronizar métricas", {
          id: toastId,
          description: "No se pudieron recuperar las métricas operativas del servidor municipal."
        });
      }
    },
  };
};

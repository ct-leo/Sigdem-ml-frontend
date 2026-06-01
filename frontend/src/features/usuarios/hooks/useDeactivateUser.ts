import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { USERS_KEYS } from "../types/user.types";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (id: number | string) => usersService.deactivateUser(Number(id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEYS.all });
      toast.warning("Usuario desactivado");
      addNotification(
        "Usuario Desactivado",
        `La cuenta de ${data.nombre} ha sido suspendida temporalmente.`,
        "warning",
        "Sistema",
        "/usuarios"
      );
    },
    onError: (error: any) => {
      console.error("Error deactivating user:", error);
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al desactivar el usuario";
      toast.error(detail);
    },
  });
};

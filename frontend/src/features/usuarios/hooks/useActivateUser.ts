import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { USERS_KEYS } from "../types/user.types";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useActivateUser = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (id: number | string) => usersService.activateUser(Number(id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEYS.all });
      toast.success("Usuario activado correctamente");
      addNotification(
        "Usuario Activado",
        `El funcionario ${data.nombre} ha sido activado en el sistema.`,
        "success",
        "Sistema",
        "/usuarios"
      );
    },
    onError: (error: any) => {
      console.error("Error activating user:", error);
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al activar el usuario";
      toast.error(detail);
    },
  });
};

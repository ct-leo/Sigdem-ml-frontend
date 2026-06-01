import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { USERS_KEYS } from "../types/user.types";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: (id: number | string) => usersService.deleteUser(Number(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEYS.all });
      toast.error("Usuario eliminado");
      addNotification(
        "Usuario Eliminado",
        `La cuenta del funcionario con ID ${id} ha sido eliminada permanentemente del sistema.`,
        "warning",
        "Sistema",
        "/usuarios"
      );
    },
    onError: (error: any) => {
      console.error("Error deleting user:", error);
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al eliminar el usuario";
      toast.error(detail);
    },
  });
};

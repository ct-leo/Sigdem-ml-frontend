import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { USERS_KEYS, ROLE_MAP_TO_BACKEND } from "../types/user.types";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { UpdateUserDto } from "../types/user.types";

interface UpdateUserParams {
  id: number;
  data: any;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserParams) => {
      const dto: UpdateUserDto = {
        nombre: data.fullName,
        correo: data.email,
        rol: ROLE_MAP_TO_BACKEND[data.role] || "RECEPCIONISTA",
        is_active: data.status === "Activo",
      };
      return usersService.updateUser(id, dto);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEYS.all });
      toast.success("Usuario actualizado correctamente");
      addNotification(
        "Usuario Actualizado",
        `El funcionario ${data.nombre} ha sido actualizado correctamente.`,
        "success",
        "Sistema",
        "/usuarios"
      );
    },
    onError: (error: any) => {
      console.error("Error updating user:", error);
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al actualizar el usuario";
      toast.error(detail);
    },
  });
};

export const useUpdateUserPermissions = () => {
  return useMutation({
    mutationFn: async ({ id, permissions }: { id: string | number; permissions: any }) => {
      // Frontend-only permissions toggle
      return { id, permissions };
    },
  });
};

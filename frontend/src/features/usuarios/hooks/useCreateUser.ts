import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { USERS_KEYS, ROLE_MAP_TO_BACKEND } from "../types/user.types";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { toast } from "sonner";
import type { CreateUserDto } from "../types/user.types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (formData: any) => {
      const dto: CreateUserDto = {
        nombre: formData.fullName,
        correo: formData.email,
        password: formData.password || "123456",
        rol: ROLE_MAP_TO_BACKEND[formData.role] || "RECEPCIONISTA",
      };
      return usersService.createUser(dto);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: USERS_KEYS.all });
      toast.success("Usuario creado correctamente");
      addNotification(
        "Usuario Creado",
        `El funcionario ${data.nombre} ha sido creado correctamente en el sistema.`,
        "success",
        "Sistema",
        "/usuarios"
      );
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      const detail = error.response?.data?.detail || error.response?.data?.message || "Error al crear el usuario";
      toast.error(detail);
    },
  });
};

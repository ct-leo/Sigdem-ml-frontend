import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import type { UpdateUserDto, User } from "../types/user.types";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUserDto }) => usersService.updateUser(id, dto),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", updatedUser.id] });
      queryClient.invalidateQueries({ queryKey: ["userStatistics"] });
    },
  });
};

export const useUpdateUserPermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, permissions }: { id: string; permissions: User["permissions"] }) =>
      usersService.updateUserPermissions(id, permissions),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", updatedUser.id] });
    },
  });
};

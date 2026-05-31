import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import type { CreateUserDto } from "../types/user.types";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateUserDto) => usersService.createUser(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userStatistics"] });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["userStatistics"] });
    },
  });
};

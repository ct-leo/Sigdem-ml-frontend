import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => usersService.getUserById(id),
    enabled: !!id,
  });
};

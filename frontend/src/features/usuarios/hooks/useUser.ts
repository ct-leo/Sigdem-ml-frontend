import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { USERS_KEYS } from "../types/user.types";

export const useUser = (id: number | string) => {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  
  return useQuery({
    queryKey: USERS_KEYS.detail(Number(numericId)),
    queryFn: () => usersService.getUser(Number(numericId)),
    enabled: !!numericId && !isNaN(Number(numericId)),
  });
};

import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { USERS_KEYS, mapUserToLegacy } from "../types/user.types";
import type { UserStatistics } from "../types/user.types";

export const useUsers = () => {
  return useQuery({
    queryKey: USERS_KEYS.list,
    queryFn: async () => {
      const backendUsers = await usersService.getUsers();
      return backendUsers.map(mapUserToLegacy);
    },
  });
};

export const useUserStatistics = () => {
  return useQuery<UserStatistics>({
    queryKey: ["users", "statistics"],
    queryFn: async () => {
      const users = await usersService.getUsers();
      return {
        totalUsers: users.length,
        activeUsers: users.filter((u) => u.is_active).length,
        inactiveUsers: users.filter((u) => !u.is_active).length,
        adminUsers: users.filter((u) => u.rol === "ADMIN").length,
        operatorUsers: users.filter((u) => u.rol === "RECEPCIONISTA").length,
        lastAccessCount: users.filter((u) => u.is_active).length,
      };
    },
  });
};

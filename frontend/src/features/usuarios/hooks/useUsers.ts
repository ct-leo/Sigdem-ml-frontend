import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users.service";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.getUsers(),
  });
};

export const useUserStatistics = () => {
  return useQuery({
    queryKey: ["userStatistics"],
    queryFn: () => usersService.getUserStatistics(),
  });
};

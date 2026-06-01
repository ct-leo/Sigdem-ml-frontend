import { apiClient } from "../../../api/axios";
import type { User, CreateUserDto, UpdateUserDto, DeleteResponse } from "../types/user.types";

export const usersService = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users/");
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  createUser: async (data: CreateUserDto): Promise<User> => {
    const response = await apiClient.post<User>("/users/", data);
    return response.data;
  },

  updateUser: async (id: number, data: UpdateUserDto): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${id}`, data);
    return response.data;
  },

  deactivateUser: async (id: number): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/deactivate`);
    return response.data;
  },

  activateUser: async (id: number): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/activate`);
    return response.data;
  },

  deleteUser: async (id: number): Promise<DeleteResponse> => {
    const response = await apiClient.delete<DeleteResponse>(`/users/${id}`);
    return response.data;
  },
};

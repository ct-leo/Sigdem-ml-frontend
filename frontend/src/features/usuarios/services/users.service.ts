import type { User, CreateUserDto, UpdateUserDto, UserStatistics } from "../types/user.types";
import { getInitialMockUsers, saveMockUsers, DEFAULT_PERMISSIONS } from "../data/mockUsers";

const DELAY = 600;

export const usersService = {
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getInitialMockUsers());
      }, DELAY);
    });
  },

  getUserById: async (id: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getInitialMockUsers();
        const found = users.find((u) => u.id === id) || null;
        resolve(found);
      }, DELAY);
    });
  },

  createUser: async (dto: CreateUserDto): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getInitialMockUsers();
        const newUser: User = {
          id: `usr-${Math.floor(100 + Math.random() * 900)}`,
          fullName: dto.fullName,
          email: dto.email,
          role: dto.role,
          status: dto.status,
          phone: dto.phone,
          position: dto.position,
          area: dto.area,
          registrationDate: new Date().toISOString(),
          lastAccess: new Date().toISOString(),
          permissions: DEFAULT_PERMISSIONS.map(p => ({
            ...p,
            assigned: dto.role === "Administrador" || 
                      (dto.role === "RRHH" && p.code === "RRHH_MANAGE") ||
                      (dto.role === "Supervisor" && p.code === "TRAMITES_MANAGE")
          })),
          activities: [
            {
              id: `act-${Math.floor(100 + Math.random() * 900)}`,
              action: "Usuario Creado",
              details: `Se registró la identidad del usuario en el área ${dto.area}.`,
              timestamp: new Date().toISOString()
            }
          ]
        };

        const updated = [...users, newUser];
        saveMockUsers(updated);
        resolve(newUser);
      }, DELAY);
    });
  },

  updateUser: async (id: string, dto: UpdateUserDto): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getInitialMockUsers();
        const idx = users.findIndex((u) => u.id === id);
        if (idx === -1) {
          reject(new Error("Usuario no encontrado"));
          return;
        }

        const current = users[idx];
        const updatedUser: User = {
          ...current,
          fullName: dto.fullName,
          email: dto.email,
          role: dto.role,
          status: dto.status,
          phone: dto.phone,
          position: dto.position,
          area: dto.area,
          // Re-evaluate permissions if role changed
          permissions: current.permissions.map(p => ({
            ...p,
            assigned: dto.role === "Administrador" ? true : p.assigned
          })),
          activities: [
            ...current.activities,
            {
              id: `act-${Math.floor(100 + Math.random() * 900)}`,
              action: "Perfil Actualizado",
              details: "Se actualizaron los datos administrativos en el sistema.",
              timestamp: new Date().toISOString()
            }
          ]
        };

        const updatedList = [...users];
        updatedList[idx] = updatedUser;
        saveMockUsers(updatedList);
        resolve(updatedUser);
      }, DELAY);
    });
  },

  updateUserPermissions: async (id: string, permissions: User["permissions"]): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getInitialMockUsers();
        const idx = users.findIndex((u) => u.id === id);
        if (idx === -1) {
          reject(new Error("Usuario no encontrado"));
          return;
        }

        const current = users[idx];
        const updatedUser: User = {
          ...current,
          permissions,
          activities: [
            ...current.activities,
            {
              id: `act-${Math.floor(100 + Math.random() * 900)}`,
              action: "Permisos RBAC Modificados",
              details: "Se reconfiguraron los privilegios del rol administrativo.",
              timestamp: new Date().toISOString()
            }
          ]
        };

        const updatedList = [...users];
        updatedList[idx] = updatedUser;
        saveMockUsers(updatedList);
        resolve(updatedUser);
      }, DELAY);
    });
  },

  deleteUser: async (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getInitialMockUsers();
        const found = users.some(u => u.id === id);
        if (!found) {
          reject(new Error("Usuario no encontrado"));
          return;
        }

        const filtered = users.filter(u => u.id !== id);
        saveMockUsers(filtered);
        resolve(true);
      }, DELAY);
    });
  },

  getUserStatistics: async (): Promise<UserStatistics> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getInitialMockUsers();
        const totalUsers = users.length;
        const activeUsers = users.filter(u => u.status === "Activo").length;
        const inactiveUsers = users.filter(u => u.status !== "Activo").length;
        const adminUsers = users.filter(u => u.role === "Administrador").length;
        const operatorUsers = users.filter(u => u.role === "Operador").length;
        
        // Count users who logged in within the last 24 hours (simulated as logged in within current session/day)
        const lastAccessCount = users.filter(u => u.lastAccess).length;

        resolve({
          totalUsers,
          activeUsers,
          inactiveUsers,
          adminUsers,
          operatorUsers,
          lastAccessCount
        });
      }, DELAY);
    });
  }
};

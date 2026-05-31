import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserState, UserActions } from "./user.types";

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      id: "usr-001",
      fullName: "Carlos Mendoza",
      email: "carlos.mendoza@municipalidad.gob.pe",
      role: "Administrador",
      area: "Tecnologías de Información",
      position: "Jefe de Soporte y Sistemas",
      lastAccess: new Date().toISOString(),

      setUser: (user) => set(user),

      updateUser: (user) => set((state) => ({ ...state, ...user })),

      clearUser: () =>
        set({
          id: null,
          fullName: null,
          email: null,
          role: null,
          area: null,
          position: null,
          lastAccess: null,
        }),
    }),
    {
      name: "sigdem-ml-user-profile-storage",
    }
  )
);

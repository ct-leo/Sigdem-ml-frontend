import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProfileResponse } from "../features/auth/types/auth.types";

interface UserState {
  id: number | null;
  nombre: string | null;
  correo: string | null;
  rol: string | null;
  is_active: boolean | null;
  // Compatibility keys for existing frontend modules
  fullName: string | null;
  email: string | null;
  role: string | null;
  position: string | null;
  lastAccess: string | null;
}

interface UserActions {
  setUser: (profile: ProfileResponse) => void;
  clearUser: () => void;
  updateUser: (user: Partial<UserState>) => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      id: null,
      nombre: null,
      correo: null,
      rol: null,
      is_active: null,
      fullName: null,
      email: null,
      role: null,
      position: "Personal Administrativo",
      lastAccess: new Date().toISOString(),

      setUser: (profile) =>
        set({
          id: profile.id,
          nombre: profile.nombre,
          correo: profile.correo,
          rol: profile.rol,
          is_active: profile.is_active,
          // Sync with old keys for complete UI compatibility
          fullName: profile.nombre,
          email: profile.correo,
          role: profile.rol,
          lastAccess: new Date().toISOString(),
        }),

      clearUser: () =>
        set({
          id: null,
          nombre: null,
          correo: null,
          rol: null,
          is_active: null,
          fullName: null,
          email: null,
          role: null,
          lastAccess: null,
        }),

      updateUser: (data) =>
        set((state) => {
          const updatedNombre = data.nombre !== undefined ? data.nombre : (data.fullName !== undefined ? data.fullName : state.nombre);
          const updatedCorreo = data.correo !== undefined ? data.correo : (data.email !== undefined ? data.email : state.correo);
          const updatedRol = data.rol !== undefined ? data.rol : (data.role !== undefined ? data.role : state.rol);
          const updatedPosition = data.position !== undefined ? data.position : state.position;
          const updatedLastAccess = data.lastAccess !== undefined ? data.lastAccess : state.lastAccess;
          return {
            ...state,
            nombre: updatedNombre,
            correo: updatedCorreo,
            rol: updatedRol,
            fullName: updatedNombre,
            email: updatedCorreo,
            role: updatedRol,
            position: updatedPosition,
            lastAccess: updatedLastAccess,
          };
        }),
    }),
    {
      name: "sigdem-ml-user-state-storage",
    }
  )
);

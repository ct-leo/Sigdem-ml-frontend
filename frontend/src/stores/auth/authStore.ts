import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, AuthActions } from "./auth.types";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      userId: null,
      role: null,
      permissions: [],

      login: (token, userId, role, permissions) =>
        set({ token, isAuthenticated: true, userId, role, permissions }),

      logout: () =>
        set({ token: null, isAuthenticated: false, userId: null, role: null, permissions: [] }),

      setToken: (token) => set({ token, isAuthenticated: !!token }),

      setUser: (userId, role, permissions) => set({ userId, role, permissions }),

      clearAuth: () =>
        set({ token: null, isAuthenticated: false, userId: null, role: null, permissions: [] }),
    }),
    {
      name: "sigdem-ml-auth-storage",
    }
  )
);

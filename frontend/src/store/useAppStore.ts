import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: "light",
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "sigdem-ml-app-storage",
    }
  )
);

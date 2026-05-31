import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NotificationState, NotificationActions, Notification } from "./notification.types";

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "not-001",
    title: "Nuevo Trámite Registrado",
    message: "Se ha ingresado el expediente de Licencia de Funcionamiento LIC-994 en Fiscalización.",
    type: "info",
    category: "Trámites",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    link: "/tramites",
  },
  {
    id: "not-002",
    title: "Procesamiento OCR Exitoso",
    message: "El expediente EXP-002 ha sido digitalizado y analizado mediante NLP de manera exitosa.",
    type: "success",
    category: "Documentos",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    link: "/documentos",
  },
  {
    id: "not-003",
    title: "Modelo IA Optimizado",
    message: "La precisión del clasificador de priorización se ha elevado a un 94.2% (Random Forest).",
    type: "system",
    category: "IA",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    link: "/machine-learning",
  },
  {
    id: "not-004",
    title: "Nueva Convocatoria Pública",
    message: "Se ha abierto el proceso CONV-2026-005 para Analista de Recursos Humanos.",
    type: "info",
    category: "RRHH",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    link: "/convocatorias",
  },
  {
    id: "not-005",
    title: "Usuario Bloqueado",
    message: "La cuenta de José Castillo (Tesorería) ha sido suspendida temporalmente por seguridad.",
    type: "warning",
    category: "Sistema",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    link: "/usuarios",
  },
];

export const useNotificationStore = create<NotificationState & NotificationActions>()(
  persist(
    (set) => ({
      notifications: INITIAL_NOTIFICATIONS,

      addNotification: (title, message, type, category, link) =>
        set((state) => {
          const newNotif: Notification = {
            id: `not-${Math.floor(100 + Math.random() * 900)}`,
            title,
            message,
            type,
            category,
            read: false,
            createdAt: new Date().toISOString(),
            link,
          };
          return { notifications: [newNotif, ...state.notifications] };
        }),

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "sigdem-ml-notification-storage",
    }
  )
);

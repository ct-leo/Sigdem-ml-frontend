import React, { useState, useMemo } from "react";
import { useNotifications as useZustandNotifications } from "../../../stores/hooks/useNotifications";
import { NotificationStats } from "./NotificationStats";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationCard } from "./NotificationCard";
import { NotificationEmptyState } from "./NotificationEmptyState";
import { useNotifications as useBackendNotifications } from "../hooks/useNotifications";
import { NotificationsTable } from "./NotificationsTable";
import { SendNotificationModal } from "./SendNotificationModal";
import { NotificationDetailModal } from "./NotificationDetailModal";
import type { NotificationStatus } from "../types/notification.types";
import type { NotificationFiltersState } from "./NotificationFilters";
import { CheckCheck, Trash2, Mail, Bell, Send, Search } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { alerts } from "../../../utils/sweetalert";

export const NotificationCenter: React.FC = () => {
  // Zustand State (Local Alerts / Audit logs)
  const { notifications: zustandNotifications, markAllAsRead, clearNotifications } = useZustandNotifications();
  const [zustandFilters, setZustandFilters] = useState<NotificationFiltersState>({
    readStatus: "all",
    category: "",
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<"emails" | "alerts">("emails");

  // Backend Filters (Real email notifications)
  const [backendStatus, setBackendStatus] = useState<NotificationStatus | "">("");
  const [tramiteFilter, setTramiteFilter] = useState<string>("");
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Fetch real backend notifications
  const { data: backendNotifications, isLoading: isLoadingBackend } = useBackendNotifications({
    estado: backendStatus ? backendStatus : undefined,
    tramite_id: tramiteFilter ? Number(tramiteFilter) : undefined,
  });

  // Filter local Zustand alerts
  const filteredZustand = useMemo(() => {
    return zustandNotifications.filter((n) => {
      let matchesRead = true;
      if (zustandFilters.readStatus === "unread") {
        matchesRead = !n.read;
      } else if (zustandFilters.readStatus === "read") {
        matchesRead = n.read;
      }
      const matchesCategory = zustandFilters.category ? n.category === zustandFilters.category : true;
      return matchesRead && matchesCategory;
    });
  }, [zustandNotifications, zustandFilters]);

  // Bulk Actions
  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success("Se marcaron todos los avisos como leídos.");
  };

  const handleClearAll = async () => {
    const result = await alerts.confirmDelete(
      "¿Vaciar Historial?",
      "¿Está seguro que desea eliminar permanentemente todas sus alertas? Esta acción no se puede deshacer."
    );
    if (result.isConfirmed) {
      clearNotifications();
      toast.success("Historial de alertas vaciado.");
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Tabs Selector Header */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("emails")}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all leading-none ${activeTab === "emails" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <Mail className="w-4 h-4" />
          Despacho de Comunicaciones (Real Emails)
        </button>
        <button
          onClick={() => setActiveTab("alerts")}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all leading-none ${activeTab === "alerts" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <Bell className="w-4 h-4" />
          Alertas de Sistema y Auditoría
        </button>
      </div>

      {activeTab === "emails" ? (
        /* TAB A: Real Email Communications Dashboard */
        <div className="flex flex-col gap-6">
          {/* Dashboard Stats Summary Widget */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col gap-1">
              <span className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">Total Enviadas</span>
              <span className="text-lg font-black text-slate-800 dark:text-white">
                {backendNotifications?.filter(n => n.estado === "ENVIADO").length || 0}
              </span>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col gap-1">
              <span className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">Pendientes</span>
              <span className="text-lg font-black text-amber-500">
                {backendNotifications?.filter(n => n.estado === "PENDIENTE").length || 0}
              </span>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col gap-1">
              <span className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">Fallidas (Error)</span>
              <span className="text-lg font-black text-rose-500">
                {backendNotifications?.filter(n => n.estado === "FALLIDO").length || 0}
              </span>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col gap-1">
              <span className="text-3xs font-extrabold text-slate-400 uppercase tracking-wider">Simuladas</span>
              <span className="text-lg font-black text-blue-500">
                {backendNotifications?.filter(n => n.estado === "SIMULADO").length || 0}
              </span>
            </div>
          </div>

          {/* Filtering toolbar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col xl:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 w-full xl:w-auto">
              <Button
                onClick={() => setIsSendOpen(true)}
                variant="outline"
                size="sm"
                className="gap-1.5 font-bold py-1.5 px-4 bg-blue-600 text-white hover:bg-blue-700 hover:text-white border-none shrink-0"
              >
                <Send className="w-4 h-4" />
                Redactar Notificación
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto items-center">
              {/* Search by Tramite */}
              <div className="relative w-full sm:w-56 shrink-0">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={tramiteFilter}
                  onChange={(e) => setTramiteFilter(e.target.value)}
                  placeholder="Filtrar por ID Trámite..."
                  className="w-full h-9 pl-8 pr-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status Select filter */}
              <select
                value={backendStatus}
                onChange={(e) => setBackendStatus(e.target.value as any)}
                className="w-full sm:w-44 h-9 px-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Todos los estados --</option>
                <option value="PENDIENTE">Pendientes</option>
                <option value="ENVIADO">Enviados</option>
                <option value="FALLIDO">Fallidos</option>
                <option value="SIMULADO">Simulados</option>
              </select>
            </div>
          </div>

          {/* Email notifications list table */}
          <NotificationsTable
            notifications={backendNotifications || []}
            isLoading={isLoadingBackend}
            onSelectNotification={setSelectedId}
          />
        </div>
      ) : (
        /* TAB B: Zustand Alert Audit logs (Original center) */
        <div className="flex flex-col gap-6">
          <NotificationStats notifications={zustandNotifications} />

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                onClick={handleMarkAllRead}
                disabled={zustandNotifications.length === 0}
                variant="outline"
                size="sm"
                className="gap-1.5 font-bold py-1.5 px-4"
              >
                <CheckCheck className="w-4 h-4 text-navy-blue" />
                Marcar Leídas
              </Button>
              <Button
                onClick={handleClearAll}
                disabled={zustandNotifications.length === 0}
                variant="outline"
                size="sm"
                className="gap-1.5 font-bold py-1.5 px-4 text-danger border-red-200 hover:bg-red-50 hover:text-danger"
              >
                <Trash2 className="w-4 h-4" />
                Vaciar Todo
              </Button>
            </div>
            <NotificationFilters filters={zustandFilters} onFilterChange={setZustandFilters} />
          </div>

          {filteredZustand.length === 0 ? (
            <NotificationEmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredZustand.map((notif) => (
                  <NotificationCard key={notif.id} notification={notif} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Sending Modal */}
      <SendNotificationModal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} />

      {/* Detail Inspector Modal */}
      {selectedId !== null && (
        <NotificationDetailModal
          isOpen={selectedId !== null}
          onClose={() => setSelectedId(null)}
          notificationId={selectedId}
        />
      )}
    </div>
  );
};
export default NotificationCenter;

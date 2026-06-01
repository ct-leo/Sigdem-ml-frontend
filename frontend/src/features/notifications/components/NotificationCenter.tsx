import React, { useState, useMemo } from "react";
import { useNotifications } from "../../../stores/hooks/useNotifications";
import { NotificationStats } from "./NotificationStats";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationCard } from "./NotificationCard";
import { NotificationEmptyState } from "./NotificationEmptyState";
import type { NotificationFiltersState } from "./NotificationFilters";
import { CheckCheck, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { alerts } from "../../../utils/sweetalert";

export const NotificationCenter: React.FC = () => {
  const { notifications, markAllAsRead, clearNotifications } = useNotifications();
  const [filters, setFilters] = useState<NotificationFiltersState>({
    readStatus: "all",
    category: "",
  });

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      let matchesRead = true;
      if (filters.readStatus === "unread") {
        matchesRead = !n.read;
      } else if (filters.readStatus === "read") {
        matchesRead = n.read;
      }

      const matchesCategory = filters.category ? n.category === filters.category : true;

      return matchesRead && matchesCategory;
    });
  }, [notifications, filters]);

  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success("Se marcaron todos los avisos como leídos.");
  };

  const handleClearAll = async () => {
    const result = await alerts.confirmDelete(
      "¿Vaciar Historial?",
      "¿Está seguro que desea eliminar permanentemente todas sus notificaciones? Esta acción no se puede deshacer."
    );
    if (result.isConfirmed) {
      clearNotifications();
      toast.success("Historial de notificaciones vaciado.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* KPIs Stats */}
      <NotificationStats notifications={notifications} />

      {/* Toolbar / Actions Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-border-color shadow-sm">
        {/* Bulk Action Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            onClick={handleMarkAllRead}
            disabled={notifications.length === 0}
            variant="outline"
            size="sm"
            className="gap-1.5 font-bold py-1.5 px-4"
          >
            <CheckCheck className="w-4 h-4 text-navy-blue" />
            Marcar Leídas
          </Button>
          <Button
            onClick={handleClearAll}
            disabled={notifications.length === 0}
            variant="outline"
            size="sm"
            className="gap-1.5 font-bold py-1.5 px-4 text-danger border-red-200 hover:bg-red-50 hover:text-danger"
          >
            <Trash2 className="w-4 h-4" />
            Vaciar Todo
          </Button>
        </div>

        {/* Categories / Read Filter Selectors */}
        <NotificationFilters filters={filters} onFilterChange={setFilters} />
      </div>

      {/* Notifications grid card listing */}
      {filteredNotifications.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredNotifications.map((notif) => (
              <NotificationCard key={notif.id} notification={notif} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

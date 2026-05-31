import React from "react";
import type { Notification } from "../../../stores/notifications/notification.types";
import { useNotificationStore } from "../../../stores/notifications/notificationStore";
import { Check, Trash2, Calendar, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const navigate = useNavigate();
  const { markAsRead, removeNotification } = useNotificationStore();

  const getAlertStyle = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-dashboard-green/10 border-dashboard-green/30 text-dashboard-green";
      case "warning":
        return "bg-golden-sand/10 border-golden-sand/30 text-golden-sand";
      case "error":
        return "bg-red-50 border-red-200 text-danger";
      case "system":
        return "bg-navy-blue/10 border-navy-blue/30 text-navy-blue";
      default:
        return "bg-gray-100 border-gray-200 text-text-secondary";
    }
  };

  const handleLinkClick = () => {
    if (notification.link) {
      markAsRead(notification.id);
      navigate(notification.link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 ${
        !notification.read ? "border-l-4 border-l-navy-blue" : "border-border-color"
      }`}
    >
      {/* Header Row */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-extrabold text-text-primary text-sm leading-tight">
              {notification.title}
            </h4>
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full select-none ${getAlertStyle(notification.type)}`}>
              {notification.category}
            </span>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-navy-blue animate-pulse shrink-0" />
            )}
          </div>
          <p className="text-xs text-text-secondary leading-normal font-semibold mt-1">
            {notification.message}
          </p>
        </div>
      </div>

      <hr className="border-border-color/60" />

      {/* Footer Specs & Actions */}
      <div className="flex justify-between items-center gap-4 flex-wrap text-[10px] font-semibold text-text-secondary">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-text-secondary" />
            {new Date(notification.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-text-secondary" />
            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Action icons row */}
        <div className="flex items-center gap-2">
          {notification.link && (
            <button
              onClick={handleLinkClick}
              title="Ir al expediente / módulo"
              className="p-1.5 hover:bg-navy-blue/10 text-navy-blue rounded-lg transition-colors inline-flex items-center gap-1 text-[10px] font-bold"
            >
              Inspeccionar <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          {!notification.read && (
            <button
              onClick={() => markAsRead(notification.id)}
              title="Marcar como leída"
              className="p-1.5 hover:bg-dashboard-green/10 text-dashboard-green rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => removeNotification(notification.id)}
            title="Eliminar notificación"
            className="p-1.5 hover:bg-red-50 text-danger rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

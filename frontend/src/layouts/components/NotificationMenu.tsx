import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../../stores/hooks/useNotifications";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const NotificationMenu: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markAllAsRead, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const recentNotifications = notifications.slice(0, 4);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success("Notificaciones marcadas como leídas");
  };

  const handleItemClick = (id: string, link?: string) => {
    markAsRead(id);
    setIsOpen(false);
    if (link) {
      navigate(link);
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-dashboard-green";
      case "warning":
        return "bg-golden-sand";
      case "error":
        return "bg-danger";
      default:
        return "bg-navy-blue";
    }
  };

  return (
    <div className="relative select-none" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors relative flex items-center justify-center text-text-secondary focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-danger text-white text-[8px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-border-color overflow-hidden z-50 text-xs font-semibold text-text-primary"
          >
            <div className="p-4 border-b border-border-color flex justify-between items-center bg-light-bg">
              <h3 className="font-extrabold text-sm text-text-primary">Notificaciones</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[10px] text-navy-blue font-extrabold cursor-pointer hover:underline uppercase tracking-wide focus:outline-none"
                >
                  Marcar leídas
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-border-color/50">
              {recentNotifications.length > 0 ? (
                recentNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleItemClick(notif.id, notif.link)}
                    className={`p-3.5 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${
                      !notif.read ? "bg-navy-blue/5 border-l-2 border-l-navy-blue" : ""
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-light-bg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <div className={`w-2 h-2 rounded-full ${getBadgeColor(notif.type)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <p className="text-xs font-black text-text-primary truncate">{notif.title}</p>
                        <span className="text-[8px] font-black uppercase text-text-secondary whitespace-nowrap">
                          {notif.category}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-text-secondary mt-0.5 line-clamp-2 leading-relaxed font-semibold">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-text-secondary font-semibold text-[11px]">
                  Sin notificaciones recientes
                </div>
              )}
            </div>
            <div className="p-3 text-center border-t border-border-color bg-light-bg/40">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/notificaciones");
                }}
                className="text-xs text-navy-blue font-extrabold hover:underline uppercase tracking-wider focus:outline-none"
              >
                Ver todas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const NotificationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors relative flex items-center justify-center text-text-secondary focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-white"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-border-color overflow-hidden z-50"
          >
            <div className="p-4 border-b border-border-color flex justify-between items-center bg-light-bg">
              <h3 className="font-semibold text-text-primary">Notificaciones</h3>
              <span className="text-xs text-navy-blue font-medium cursor-pointer hover:underline">Marcar leídas</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {/* Dummy notification items */}
              <div className="p-4 border-b border-border-color/50 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-dashboard-green/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-dashboard-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Trámite Aprobado</p>
                    <p className="text-xs text-text-secondary mt-0.5">El expediente #4052 ha sido aprobado exitosamente.</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 5 min</p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-danger" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Alerta Crítica</p>
                    <p className="text-xs text-text-secondary mt-0.5">2 trámites urgentes están a punto de vencer.</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 1 hora</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 text-center border-t border-border-color">
              <button className="text-sm text-navy-blue font-medium hover:underline">
                Ver todas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

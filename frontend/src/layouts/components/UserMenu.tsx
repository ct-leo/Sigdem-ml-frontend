import React, { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-navy-blue flex items-center justify-center text-white font-medium text-sm">
          AD
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-semibold text-text-primary leading-none">Admin</span>
          <span className="text-xs text-text-secondary">Super Usuario</span>
        </div>
        <ChevronDown className="w-4 h-4 text-text-secondary ml-1" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border-color overflow-hidden z-50 py-1"
          >
            <div className="px-4 py-3 border-b border-border-color">
              <p className="text-sm font-semibold text-text-primary">Administrador</p>
              <p className="text-xs text-text-secondary truncate">admin@sigdem-ml.gob</p>
            </div>
            
            <div className="py-1">
              <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors">
                <User className="w-4 h-4 text-text-secondary" />
                Mi Perfil
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors">
                <Settings className="w-4 h-4 text-text-secondary" />
                Configuración
              </button>
            </div>
            
            <div className="border-t border-border-color py-1">
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-danger/10 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

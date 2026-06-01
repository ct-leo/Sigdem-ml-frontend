import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../stores/hooks/useUser";
import { useLogout } from "../../features/auth/hooks/useLogout";

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const user = useUser();
  const logoutMutation = useLogout();

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
    logoutMutation.mutate();
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-navy-blue flex items-center justify-center text-white font-semibold text-xs tracking-wider">
          {getInitials(user.fullName)}
        </div>
        <div className="hidden md:flex flex-col items-start text-left">
          <span className="text-sm font-semibold text-text-primary leading-none">
            {user.fullName || "Usuario"}
          </span>
          <span className="text-xs text-text-secondary mt-0.5">
            {user.role || "Funcionario"}
          </span>
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
              <p className="text-sm font-semibold text-text-primary">
                {user.fullName || "Usuario"}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {user.email || "usuario@municipalidad.gob.pe"}
              </p>
            </div>
            
            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/mi-perfil");
                }}
                className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors font-medium"
              >
                <User className="w-4 h-4 text-text-secondary" />
                Mi Perfil
              </button>
            </div>
            
            <div className="border-t border-border-color py-1">
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-danger/10 flex items-center gap-2 transition-colors font-medium"
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

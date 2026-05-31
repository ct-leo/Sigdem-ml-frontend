import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Eye, Edit, CheckCircle, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Props {
  tramiteId: string;
}

export const TramiteActions: React.FC<Props> = ({ tramiteId }) => {
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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors focus:outline-none text-text-secondary"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-border-color overflow-hidden z-50 py-1"
          >
            <button
              onClick={() => navigate(`/tramites/${tramiteId}`)}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4 text-text-secondary" />
              Ver detalle
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Edit className="w-4 h-4 text-text-secondary" />
              Editar
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <CheckCircle className="w-4 h-4 text-municipal-green" />
              Cambiar estado
            </button>
            <div className="border-t border-border-color my-1"></div>
            <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4 text-text-secondary" />
              Exportar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

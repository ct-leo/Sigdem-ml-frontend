import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Download, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUpdateCurriculumStatus } from "../hooks/useCurriculums";
import { toast } from "sonner";
import type { Curriculum, CandidateStatus } from "../types/curriculum.types";

interface CandidateActionsProps {
  cv: Curriculum;
}

export const CandidateActions: React.FC<CandidateActionsProps> = ({ cv }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateStatusMutation = useUpdateCurriculumStatus();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = () => {
    setIsOpen(false);
    toast.success(`Descargando CV de: ${cv.candidateName} (Formato PDF)`);
  };

  const handleToggleStatus = () => {
    setIsOpen(false);
    const statusesCycle: Record<CandidateStatus, CandidateStatus> = {
      Pendiente: "En Revisión",
      "En Revisión": "Preseleccionado",
      Preseleccionado: "Aprobado",
      Aprobado: "Descartado",
      Descartado: "Pendiente",
    };
    const nextStatus = statusesCycle[cv.status] || "Pendiente";
    toast.promise(
      updateStatusMutation.mutateAsync({
        id: cv.id,
        status: nextStatus,
      }),
      {
        loading: "Actualizando estado...",
        success: `Candidato actualizado a: ${nextStatus}`,
        error: "Error al cambiar estado",
      }
    );
  };

  return (
    <div className="relative animate-none select-none text-left" ref={menuRef}>
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
              onClick={handleDownload}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-text-secondary" />
              Descargar CV
            </button>
            <div className="border-t border-border-color my-1"></div>
            <button
              onClick={handleToggleStatus}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-municipal-green" />
              Cambiar Estado
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

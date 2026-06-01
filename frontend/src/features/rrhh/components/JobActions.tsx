import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, CheckCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useUpdateJob } from "../hooks/useUpdateJob";
import { alerts } from "../../../utils/sweetalert";
import type { Job, JobStatus } from "../types/job.types";

interface JobActionsProps {
  job: Job;
}

export const JobActions: React.FC<JobActionsProps> = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const deleteMutation = useDeleteJob();
  const updateMutation = useUpdateJob();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    setIsOpen(false);
    const result = await alerts.confirmDelete(
      "¿Eliminar Convocatoria?",
      `¿Está seguro que desea eliminar permanentemente la convocatoria "${job.titulo}"? Esta acción es irreversible.`
    );
    if (!result.isConfirmed) return;

    deleteMutation.mutate(job.id, {
      onSuccess: () => {
        alerts.success("Convocatoria Eliminada", "La oferta de empleo ha sido removida del sistema.");
      }
    });
  };

  const handleToggleStatus = async () => {
    setIsOpen(false);
    const nextStatuses: Record<string, JobStatus> = {
      ABIERTA: "PAUSADA",
      PAUSADA: "CERRADA",
      CERRADA: "ABIERTA",
    };
    const nextStatus = nextStatuses[job.estado] || "ABIERTA";

    const result = await alerts.confirmAction(
      "Cambiar Estado",
      `¿Desea cambiar el estado de la convocatoria a ${nextStatus}?`,
      "Cambiar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    updateMutation.mutate({
      id: job.id,
      data: {
        titulo: job.titulo,
        estado: nextStatus,
      }
    }, {
      onSuccess: () => {
        alerts.success("Estado Actualizado", `El estado ha cambiado a ${nextStatus} correctamente.`);
      }
    });
  };

  return (
    <div className="relative animate-none select-none" ref={menuRef}>
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
              onClick={() => navigate(`/convocatorias/${job.id}/editar`)}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Edit className="w-4 h-4 text-text-secondary" />
              Editar
            </button>
            <button
              onClick={handleToggleStatus}
              disabled={updateMutation.isPending}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4 text-[#749763]" />
              Cambiar estado
            </button>
            <div className="border-t border-border-color my-1"></div>
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-red-50 flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-danger" />
              Eliminar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

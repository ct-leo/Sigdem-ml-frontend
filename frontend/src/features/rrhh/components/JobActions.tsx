import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, Copy, CheckCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDeleteJob, useUpdateJob } from "../hooks/useUpdateJob";
import { useCreateJob } from "../hooks/useCreateJob";
import { alerts } from "../../../utils/sweetalert";
import type { Job } from "../types/job.types";

interface JobActionsProps {
  job: Job;
}

export const JobActions: React.FC<JobActionsProps> = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const deleteMutation = useDeleteJob();
  const updateMutation = useUpdateJob();
  const duplicateMutation = useCreateJob();

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
      `¿Está seguro que desea eliminar permanentemente la convocatoria "${job.title}"? Esta acción es irreversible.`
    );
    if (!result.isConfirmed) return;

    try {
      await deleteMutation.mutateAsync(job.id);
      await alerts.success("Convocatoria Eliminada", "La oferta de empleo ha sido removida del sistema.");
    } catch {
      alerts.error("Error", "Error al eliminar la convocatoria");
    }
  };

  const handleDuplicate = async () => {
    setIsOpen(false);
    const result = await alerts.confirmAction(
      "Duplicar Convocatoria",
      `¿Desea crear una copia en borrador de "${job.title}"?`,
      "Duplicar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    const duplicateDto = {
      title: `${job.title} (Copia)`,
      area: job.area,
      description: job.description,
      vacancies: job.vacancies,
      experienceYears: job.requirements.experienceYears,
      academicLevel: job.requirements.academicLevel,
      certifications: job.requirements.certifications.join(", "),
      skills: job.requirements.skills.join(", "),
      publishedAt: new Date().toISOString().substring(0, 10),
      closedAt: job.closedAt.substring(0, 10),
      status: "Borrador" as const,
    };

    try {
      await duplicateMutation.mutateAsync(duplicateDto);
      await alerts.success("Convocatoria Duplicada", "Se ha creado una copia en estado Borrador exitosamente.");
    } catch {
      alerts.error("Error", "Error al duplicar la convocatoria");
    }
  };

  const handleToggleStatus = async () => {
    setIsOpen(false);
    const nextStatuses: Record<string, "Activa" | "Pausada" | "Cerrada" | "Borrador"> = {
      Borrador: "Activa",
      Activa: "Pausada",
      Pausada: "Cerrada",
      Cerrada: "Activa",
      Finalizada: "Activa",
    };
    const nextStatus = nextStatuses[job.status] || "Activa";

    const result = await alerts.confirmAction(
      "Cambiar Estado",
      `¿Desea cambiar el estado de la convocatoria a ${nextStatus}?`,
      "Cambiar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    try {
      await updateMutation.mutateAsync({
        id: job.id,
        status: nextStatus,
      });
      await alerts.success("Estado Actualizado", `El estado ha cambiado a ${nextStatus} correctamente.`);
    } catch {
      alerts.error("Error", "Error al cambiar el estado");
    }
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
              onClick={handleDuplicate}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Copy className="w-4 h-4 text-text-secondary" />
              Duplicar
            </button>
            <button
              onClick={handleToggleStatus}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-municipal-green" />
              Cambiar estado
            </button>
            <div className="border-t border-border-color my-1"></div>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-red-50 flex items-center gap-2 transition-colors"
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

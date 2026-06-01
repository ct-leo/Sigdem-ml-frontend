import React, { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { uploadCVSchema, type UploadCVFormValues } from "../../cvs/schemas/uploadCV.schema";
import { useUploadCV } from "../../cvs/hooks/useUploadCV";
import { useOpenJobsForCVs } from "../../cvs/hooks/useOpenJobsForCVs";
import { Button } from "../../../components/ui/Button";

interface UploadCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedJobId?: number;
}

export const UploadCVModal: React.FC<UploadCVModalProps> = ({
  isOpen,
  onClose,
  preselectedJobId,
}) => {
  const { data: openJobs, isLoading: isLoadingJobs } = useOpenJobsForCVs();
  const { mutate: uploadCV, isPending, uploadProgress } = useUploadCV();

  const [dragOver, setDragOver] = useState(false);
  const [filePreview, setFilePreview] = useState<{ name: string; size: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UploadCVFormValues>({
    resolver: zodResolver(uploadCVSchema),
    defaultValues: {
      nombre_candidato: "",
      correo_candidato: "",
      telefono_candidato: "",
      job_id: preselectedJobId ?? undefined,
    },
  });

  const handleFileSet = useCallback(
    (file: File) => {
      setValue("file", file, { shouldValidate: true });
      const sizeKB = file.size / 1024;
      const sizeLabel =
        sizeKB >= 1024
          ? `${(sizeKB / 1024).toFixed(1)} MB`
          : `${sizeKB.toFixed(0)} KB`;
      setFilePreview({ name: file.name, size: sizeLabel });
    },
    [setValue]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileSet(file);
    },
    [handleFileSet]
  );

  const onSubmit = (data: UploadCVFormValues) => {
    uploadCV(
      {
        file: data.file,
        nombre_candidato: data.nombre_candidato,
        correo_candidato: data.correo_candidato,
        telefono_candidato: data.telefono_candidato,
        job_id: data.job_id,
      },
      {
        onSuccess: () => {
          reset();
          setFilePreview(null);
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    if (!isPending) {
      reset();
      setFilePreview(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-border-color">
              {/* Header */}
              <div className="bg-navy-blue px-6 py-5 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 rounded-lg p-2">
                    <Upload className="w-5 h-5 text-golden-sand" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-white">
                      Cargar Nuevo Currículo
                    </h2>
                    <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider mt-0.5">
                      Portal ATS — Módulo de Reclutamiento
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isPending}
                  className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                {/* Upload Area */}
                <div>
                  <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                    Archivo del Currículo
                  </label>
                  <Controller
                    name="file"
                    control={control}
                    render={() => (
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onClick={() =>
                          document.getElementById("cv-file-input")?.click()
                        }
                        className={`
                          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                          ${dragOver
                            ? "border-navy-blue bg-navy-blue/5 scale-[1.01]"
                            : filePreview
                            ? "border-[#749763] bg-[#749763]/5"
                            : "border-border-color hover:border-navy-blue/40 hover:bg-gray-50/50"
                          }
                        `}
                      >
                        <input
                          id="cv-file-input"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSet(file);
                          }}
                        />

                        {filePreview ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#749763]/10 border border-[#749763]/20 flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-[#749763]" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-bold text-text-primary truncate max-w-[280px]">
                                {filePreview.name}
                              </p>
                              <p className="text-xs text-text-secondary">
                                {filePreview.size} · Listo para cargar
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <FileText className="w-6 h-6 text-text-secondary" />
                            </div>
                            <p className="text-sm font-semibold text-text-primary">
                              Arrastra el archivo aquí o{" "}
                              <span className="text-navy-blue underline">
                                haz clic para seleccionar
                              </span>
                            </p>
                            <p className="text-xs text-text-secondary">
                              PDF, DOC o DOCX · Máximo 20 MB
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  />
                  {errors.file && (
                    <p className="flex items-center gap-1 text-xs text-danger mt-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.file.message}
                    </p>
                  )}
                </div>

                {/* Upload Progress Bar */}
                {isPending && uploadProgress > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Subiendo archivo...
                      </span>
                      <span className="text-xs font-bold text-navy-blue">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-border-color/30">
                      <motion.div
                        className="h-full bg-gradient-to-r from-navy-blue to-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}

                {/* Convocatoria */}
                <div>
                  <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                    <Briefcase className="inline w-3.5 h-3.5 mr-1 text-navy-blue" />
                    Convocatoria
                  </label>
                  <select
                    {...register("job_id", { valueAsNumber: true })}
                    className="w-full border border-border-color rounded-lg py-2.5 px-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all bg-white"
                  >
                    <option value="">
                      {isLoadingJobs
                        ? "Cargando convocatorias..."
                        : "Seleccione una convocatoria abierta"}
                    </option>
                    {openJobs?.map((job) => (
                      <option key={job.id} value={job.id}>
                        CONV-{job.id} — {job.titulo}
                      </option>
                    ))}
                  </select>
                  {errors.job_id && (
                    <p className="flex items-center gap-1 text-xs text-danger mt-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.job_id.message}
                    </p>
                  )}
                </div>

                {/* Candidate Data */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                      <User className="inline w-3.5 h-3.5 mr-1 text-navy-blue" />
                      Nombre Completo del Candidato
                    </label>
                    <input
                      {...register("nombre_candidato")}
                      type="text"
                      placeholder="Ej. María Rodríguez Pérez"
                      className="w-full border border-border-color rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all"
                    />
                    {errors.nombre_candidato && (
                      <p className="flex items-center gap-1 text-xs text-danger mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.nombre_candidato.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                        <Mail className="inline w-3.5 h-3.5 mr-1 text-navy-blue" />
                        Correo Electrónico
                      </label>
                      <input
                        {...register("correo_candidato")}
                        type="email"
                        placeholder="candidato@ejemplo.com"
                        className="w-full border border-border-color rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all"
                      />
                      {errors.correo_candidato && (
                        <p className="flex items-center gap-1 text-xs text-danger mt-1.5 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.correo_candidato.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-2">
                        <Phone className="inline w-3.5 h-3.5 mr-1 text-navy-blue" />
                        Teléfono
                      </label>
                      <input
                        {...register("telefono_candidato")}
                        type="tel"
                        placeholder="999 888 777"
                        className="w-full border border-border-color rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 hover:border-gray-300 transition-all"
                      />
                      {errors.telefono_candidato && (
                        <p className="flex items-center gap-1 text-xs text-danger mt-1.5 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.telefono_candidato.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-border-color">
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleClose}
                    disabled={isPending}
                    className="border border-border-color bg-white text-text-primary hover:bg-gray-50 font-bold text-xs uppercase tracking-wider"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-navy-blue hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Registrar Currículo
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

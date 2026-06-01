import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { X, Upload, FileText, CheckCircle2, RefreshCw } from "lucide-react";
import { useUploadDocument } from "../hooks/useUploadDocument";
import { useTramites } from "../../tramites/hooks/useTramites";
import { uploadDocumentSchema, type UploadDocumentFormValues } from "../schemas/uploadDocument.schema";
import { motion, AnimatePresence } from "framer-motion";

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ isOpen, onClose }) => {
  const { data: tramites } = useTramites();
  const uploadMutation = useUploadDocument();
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<UploadDocumentFormValues>({
    resolver: zodResolver(uploadDocumentSchema) as any,
    defaultValues: {
      tramite_id: "" as any,
      file: undefined
    }
  });

  const selectedFile = watch("file");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setValue("file", acceptedFiles[0], { shouldValidate: true });
      }
    }
  });

  const handleFormSubmit = (data: UploadDocumentFormValues) => {
    setUploadProgress(0);
    uploadMutation.mutate(
      {
        data: {
          file: data.file,
          tramite_id: Number(data.tramite_id)
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        }
      },
      {
        onSuccess: () => {
          setUploadProgress(null);
          reset();
          onClose();
        },
        onError: () => {
          setUploadProgress(null);
        }
      }
    );
  };

  const handleClose = () => {
    if (uploadProgress !== null) return; // Prevent closing while uploading
    reset();
    setUploadProgress(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-border-color flex flex-col"
        >
          {/* Header */}
          <div className="bg-gray-50 border-b border-border-color px-6 py-4 flex items-center justify-between">
            <h3 className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <Upload className="w-4.5 h-4.5 text-navy-blue" />
              Subir Documento al Repositorio
            </h3>
            <button
              onClick={handleClose}
              disabled={uploadProgress !== null}
              className="p-1 rounded-md text-text-secondary hover:bg-gray-150 transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 flex flex-col gap-5">
            {/* Tramite select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase">Expediente / Trámite de Destino</label>
              <Controller
                name="tramite_id"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                    disabled={uploadProgress !== null}
                    className="border border-border-color rounded-lg px-3 py-2.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-1 focus:ring-navy-blue cursor-pointer"
                  >
                    <option value="">Seleccione el trámite asociado...</option>
                    {tramites?.map((t) => (
                      <option key={t.id} value={t.id}>
                        [{t.codigo}] {t.tipo_tramite}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.tramite_id && (
                <span className="text-[10px] font-bold text-red-600">{errors.tramite_id.message}</span>
              )}
            </div>

            {/* Drag & Drop Area */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-secondary uppercase">Archivo Digital</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-navy-blue bg-blue-50/50"
                    : selectedFile
                    ? "border-[#749763] bg-green-50/10"
                    : "border-border-color hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <input {...getInputProps()} />
                {selectedFile ? (
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 bg-green-50 text-[#749763] rounded-full flex items-center justify-center border border-green-150">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-primary max-w-[280px] truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-[10px] text-text-secondary mt-0.5">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 bg-gray-50 text-text-secondary rounded-full flex items-center justify-center border border-border-color">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text-primary">
                        Arrastre un documento aquí o haga clic para seleccionar
                      </p>
                      <p className="text-[10px] text-text-secondary mt-1">
                        Formatos aceptados: PDF, DOC, DOCX, PNG, JPG, JPEG (Máx. 20 MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {errors.file && (
                <span className="text-[10px] font-bold text-red-600">{errors.file.message as string}</span>
              )}
            </div>

            {/* Progress Bar */}
            {uploadProgress !== null && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary uppercase">
                  <span>Progreso de Subida</span>
                  <span className="font-mono text-navy-blue">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border">
                  <motion.div
                    className="h-full bg-navy-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-3 border-t border-border-color/60 mt-1">
              <button
                type="button"
                onClick={handleClose}
                disabled={uploadProgress !== null}
                className="px-4 py-2 border border-border-color rounded-lg text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={uploadProgress !== null || uploadMutation.isPending}
                className="px-5 py-2 bg-navy-blue hover:bg-blue-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {uploadMutation.isPending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirmar Carga
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { UploadCloud, FileText, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

export const TramiteDropzone: React.FC<Props> = ({ value, onChange, error }) => {
  const onDrop = useCallback((acceptedFiles: File[], _fileRejections: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      onChange([...value, ...acceptedFiles]);
    }
  }, [value, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 1024 * 1024 * 10, // 10MB
  });

  const removeFile = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-navy-blue bg-navy-blue/5' : 'border-border-color hover:border-gray-400 bg-gray-50/50'}
          ${error ? 'border-danger bg-danger/5' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className={`p-3 rounded-full ${isDragActive ? 'bg-navy-blue/10 text-navy-blue' : 'bg-gray-100 text-text-secondary'}`}>
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {isDragActive ? "Suelta los archivos aquí" : "Arrastra y suelta tus archivos aquí"}
            </p>
            <p className="text-xs text-text-secondary mt-1">
              o haz clic para explorar tus carpetas
            </p>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            PDF, DOCX, JPG, PNG hasta 10MB
          </div>
        </div>
      </div>

      {error && (
        <p className="text-danger text-sm mt-2 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}

      {/* Lista de archivos */}
      <div className="mt-4 space-y-2">
        <AnimatePresence>
          {value.map((file, index) => (
            <motion.div
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-between p-3 bg-white border border-border-color rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className="w-5 h-5 text-navy-blue shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{file.name}</p>
                  <p className="text-xs text-text-secondary">{formatBytes(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className="p-1.5 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

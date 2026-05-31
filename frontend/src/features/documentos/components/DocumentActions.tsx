import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Download, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface DocumentActionsProps {
  documentId: string;
  documentName: string;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({
  documentId,
  documentName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    toast.success(`Descarga iniciada: ${documentName}`);
  };

  const handleShare = () => {
    setIsOpen(false);
    navigator.clipboard.writeText(window.location.origin + `/documentos/${documentId}`);
    toast.success("Enlace de compartición copiado al portapapeles");
  };

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
              onClick={handleDownload}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-text-secondary" />
              Descargar
            </button>
            <div className="border-t border-border-color my-1"></div>
            <button
              onClick={handleShare}
              className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4 text-municipal-green" />
              Compartir enlace
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

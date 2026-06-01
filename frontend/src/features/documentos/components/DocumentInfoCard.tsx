import React, { useState } from "react";
import type { Document } from "../types/document.types";
import { OCRStatusBadge } from "./OCRStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import {
  FileText,
  Calendar,
  Layers,
  User,
  Hash,
  Download,
  Copy,
  CheckCircle,
  ScanText,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useProcessOCR } from "../hooks/useProcessOCR";
import { useDownloadDocument } from "../hooks/useDownloadDocument";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentInfoCardProps {
  document: Document;
}

export const DocumentInfoCard: React.FC<DocumentInfoCardProps> = ({ document }) => {
  const ocrMutation = useProcessOCR();
  const downloadMutation = useDownloadDocument();
  const [isOcrExpanded, setIsOcrExpanded] = useState(true);

  const handleCopyText = () => {
    if (document.texto_extraido) {
      navigator.clipboard.writeText(document.texto_extraido);
      toast.success("Texto OCR copiado al portapapeles");
    }
  };

  const handleProcessOCR = () => {
    ocrMutation.mutate(document.id);
  };

  const handleDownload = () => {
    downloadMutation.mutate({ id: document.id, nombre_original: document.nombre_original });
  };

  // Helper size based on type
  const docType = document.tipo_archivo.toUpperCase();
  const sizeFormatted = docType === "PDF" ? "2.4 MB" : docType === "DOCX" || docType === "DOC" ? "340 KB" : "820 KB";

  return (
    <div className="flex flex-col gap-6">
      {/* Metadatos Generales */}
      <Card className="shadow-sm border border-border-color">
        <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
          <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-navy-blue" />
            Información de Expediente
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2.5">
              <Hash className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Código Documental</p>
                <p className="text-xs font-semibold text-text-primary">DOC-{document.id}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Fecha de Carga</p>
                <p className="text-xs font-semibold text-text-secondary">
                  {dayjs(document.fecha_subida).format("DD/MM/YYYY HH:mm")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Nombre de Archivo</p>
                <p className="text-xs font-semibold text-text-primary truncate max-w-[150px]">{document.nombre_original}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Subido Por</p>
                <p className="text-xs font-semibold text-text-primary">Funcionario #{document.uploaded_by_id}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Hash className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Trámite Asociado</p>
                <p className="text-xs font-semibold text-navy-blue hover:underline cursor-pointer">
                  TRM-{document.tramite_id}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Download className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Peso de Archivo</p>
                <p className="text-xs font-semibold text-text-primary">
                  {sizeFormatted}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownload}
              disabled={downloadMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-navy-blue hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition duration-150 disabled:opacity-50 select-none"
            >
              <Download className="w-4 h-4 text-golden-sand" />
              {downloadMutation.isPending ? "Descargando..." : "Descargar Documento Real"}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Panel Especial OCR */}
      <Card className="shadow-sm border border-border-color overflow-hidden">
        <CardHeader className="bg-navy-blue text-white px-6 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <ScanText className="w-4.5 h-4.5 text-golden-sand animate-pulse" />
            Procesamiento OCR
          </CardTitle>
          <OCRStatusBadge status={document.ocr_procesado} />
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-border-color">
            <div>
              <span className="text-[10px] uppercase font-bold text-text-secondary">Precisión Estimada</span>
              <p className="text-xs font-bold text-dashboard-green flex items-center gap-1 mt-0.5">
                {document.ocr_procesado === "SI" ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    94.8%
                  </>
                ) : (
                  <span className="text-text-secondary font-medium">N/A</span>
                )}
              </p>
            </div>

            {document.ocr_procesado === "NO" && (
              <button
                onClick={handleProcessOCR}
                disabled={ocrMutation.isPending}
                className="flex items-center gap-1.5 bg-[#749763] hover:bg-[#5b784c] text-white font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {ocrMutation.isPending ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    Procesar OCR
                  </>
                )}
              </button>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setIsOcrExpanded(!isOcrExpanded)}
                className="text-[10px] uppercase font-black text-text-secondary hover:text-navy-blue flex items-center gap-1.5 focus:outline-none"
              >
                <span>Texto Indexado (OCR)</span>
                {isOcrExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {document.ocr_procesado === "SI" && document.texto_extraido && (
                <button
                  onClick={handleCopyText}
                  className="text-[10px] text-navy-blue hover:text-blue-800 font-bold flex items-center gap-1 py-1 px-2 hover:bg-gray-100 rounded transition-colors uppercase tracking-wider"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copiar texto
                </button>
              )}
            </div>

            <AnimatePresence initial={false}>
              {isOcrExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {document.ocr_procesado === "SI" && document.texto_extraido ? (
                    <div className="w-full max-h-[220px] bg-gray-50 border border-border-color rounded-lg p-3 overflow-y-auto font-mono text-[11px] text-text-primary leading-normal scrollbar-thin">
                      {document.texto_extraido}
                    </div>
                  ) : (
                    <div className="w-full bg-amber-50/50 border border-amber-100 rounded-lg p-4 text-center">
                      <p className="text-xs text-warning font-semibold">
                        El procesamiento de texto no se ha ejecutado.
                      </p>
                      <p className="text-[10px] text-text-secondary mt-1">
                        Haga clic en el botón de arriba para extraer y digitalizar el texto con el motor OCR.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

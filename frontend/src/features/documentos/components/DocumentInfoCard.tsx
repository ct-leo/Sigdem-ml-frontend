import React from "react";
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
} from "lucide-react";
import { toast } from "sonner";
import dayjs from "dayjs";

interface DocumentInfoCardProps {
  document: Document;
}

export const DocumentInfoCard: React.FC<DocumentInfoCardProps> = ({ document }) => {
  const handleCopyText = () => {
    if (document.metadata.ocrText) {
      navigator.clipboard.writeText(document.metadata.ocrText);
      toast.success("Texto OCR copiado al portapapeles");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Metadatos Generales */}
      <Card className="shadow-sm border border-border-color">
        <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
          <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
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
                <p className="text-xs font-semibold text-text-primary">{document.code}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Fecha de Carga</p>
                <p className="text-xs font-semibold text-text-primary text-text-secondary">
                  {dayjs(document.uploadedAt).format("DD/MM/YYYY HH:mm")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Área Encargada</p>
                <p className="text-xs font-semibold text-text-primary">{document.responsibleArea}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Subido Por</p>
                <p className="text-xs font-semibold text-text-primary">{document.owner.name}</p>
                <p className="text-[10px] text-text-secondary">{document.owner.role}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Hash className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Trámite Asociado</p>
                <p className="text-xs font-semibold text-navy-blue hover:underline cursor-pointer">
                  {document.procedureCode || "Ninguno"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Download className="w-4 h-4 text-text-secondary mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Peso de Archivo</p>
                <p className="text-xs font-semibold text-text-primary">
                  {document.metadata.sizeFormatted} ({document.size.toLocaleString()} bytes)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Panel Especial OCR */}
      <Card className="shadow-sm border border-border-color overflow-hidden">
        <CardHeader className="bg-navy-blue text-white px-6 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <ScanText className="w-4.5 h-4.5 text-golden-sand animate-pulse" />
            Análisis OCR Inteligente
          </CardTitle>
          <OCRStatusBadge status={document.statusOcr} />
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border-color">
            <div>
              <span className="text-[10px] uppercase font-bold text-text-secondary">Procesamiento</span>
              <p className="text-xs font-semibold text-text-primary">
                {document.metadata.processedAt
                  ? dayjs(document.metadata.processedAt).format("DD/MM/YYYY HH:mm")
                  : "Pendiente en cola"}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-text-secondary">Precisión Estimada</span>
              <p className="text-xs font-bold text-dashboard-green flex items-center gap-1">
                {document.metadata.ocrAccuracy ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    {document.metadata.ocrAccuracy}%
                  </>
                ) : (
                  <span className="text-text-secondary font-medium">N/A</span>
                )}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-text-secondary">Texto Indexado (OCR)</span>
              {document.metadata.ocrText && (
                <button
                  onClick={handleCopyText}
                  className="text-xs text-navy-blue hover:text-blue-800 font-semibold flex items-center gap-1 py-1 px-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copiar texto
                </button>
              )}
            </div>

            {document.metadata.ocrText ? (
              <div className="w-full max-h-[220px] bg-gray-50 border border-border-color rounded-lg p-3 overflow-y-auto font-mono text-[11px] text-text-primary leading-normal scrollbar-thin">
                {document.metadata.ocrText}
              </div>
            ) : (
              <div className="w-full bg-amber-50/50 border border-amber-100 rounded-lg p-4 text-center">
                <p className="text-xs text-warning font-semibold">
                  El procesamiento de texto no se ha completado.
                </p>
                <p className="text-[10px] text-text-secondary mt-1">
                  El motor OCR se ejecutará de forma automática en breve.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

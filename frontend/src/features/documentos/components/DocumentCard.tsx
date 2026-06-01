import React from "react";
import type { Document } from "../types/document.types";
import { DocumentPreview } from "./DocumentPreview";
import { OCRStatusBadge } from "./OCRStatusBadge";
import { Card, CardContent } from "../../../components/ui/Card";
import { Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDownloadDocument } from "../hooks/useDownloadDocument";
import dayjs from "dayjs";

interface DocumentCardProps {
  document: Document;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const navigate = useNavigate();
  const downloadMutation = useDownloadDocument();

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadMutation.mutate({ id: document.id, nombre_original: document.nombre_original });
  };

  // Helper size based on type
  const docType = document.tipo_archivo.toUpperCase();
  const sizeFormatted = docType === "PDF" ? "2.4 MB" : docType === "DOCX" || docType === "DOC" ? "340 KB" : "820 KB";

  return (
    <Card
      onClick={() => navigate(`/documentos/${document.id}`)}
      className="group hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col h-full border border-border-color"
    >
      <CardContent className="p-4 flex flex-col justify-between flex-1 gap-3 select-none">
        {/* Top bar with file type & OCR Badge */}
        <div className="flex items-start justify-between">
          <DocumentPreview type={docType as any} />
          <OCRStatusBadge status={document.ocr_procesado} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 mt-1">
          <h4 className="font-bold text-text-primary text-sm group-hover:text-navy-blue truncate">
            {document.nombre_original}
          </h4>
          <p className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-wide">
            DOC-{document.id}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-text-secondary">
            <span>{sizeFormatted}</span>
            <span>•</span>
            <span>{dayjs(document.fecha_subida).format("DD MMM, YYYY")}</span>
          </div>
        </div>

        {/* Footer Area with Owner & Action buttons */}
        <div className="border-t border-border-color/60 pt-3 flex items-center justify-between mt-1">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-text-primary truncate">Funcionario #{document.uploaded_by_id}</p>
            <p className="text-[8px] text-text-secondary truncate">Trámite #{document.tramite_id}</p>
          </div>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => navigate(`/documentos/${document.id}`)}
              className="p-1 rounded bg-gray-50 text-text-secondary hover:bg-navy-blue hover:text-white transition-colors"
              title="Visualizar"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDownload}
              disabled={downloadMutation.isPending}
              className="p-1 rounded bg-gray-50 text-text-secondary hover:bg-navy-blue hover:text-white transition-colors disabled:opacity-50"
              title="Descargar"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

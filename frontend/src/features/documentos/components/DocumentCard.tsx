import React from "react";
import type { Document } from "../types/document.types";
import { DocumentPreview } from "./DocumentPreview";
import { OCRStatusBadge } from "./OCRStatusBadge";
import { Card, CardContent } from "../../../components/ui/Card";
import { Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import dayjs from "dayjs";

interface DocumentCardProps {
  document: Document;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const navigate = useNavigate();

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Descarga iniciada: ${document.name}`);
  };

  return (
    <Card
      onClick={() => navigate(`/documentos/${document.id}`)}
      className="group hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col h-full border border-border-color"
    >
      <CardContent className="p-4 flex flex-col justify-between flex-1 gap-3 select-none">
        {/* Top bar with file type & OCR Badge */}
        <div className="flex items-start justify-between">
          <DocumentPreview type={document.type} />
          <OCRStatusBadge status={document.statusOcr} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 mt-1">
          <h4 className="font-bold text-text-primary text-sm group-hover:text-navy-blue truncate">
            {document.name}
          </h4>
          <p className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-wide">
            {document.code}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-text-secondary">
            <span>{document.metadata.sizeFormatted}</span>
            <span>•</span>
            <span>{dayjs(document.uploadedAt).format("DD MMM, YYYY")}</span>
          </div>
        </div>

        {/* Footer Area with Owner & Action buttons */}
        <div className="border-t border-border-color/60 pt-3 flex items-center justify-between mt-1">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-text-primary truncate">{document.owner.name}</p>
            <p className="text-[8px] text-text-secondary truncate">{document.responsibleArea}</p>
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
              className="p-1 rounded bg-gray-50 text-text-secondary hover:bg-navy-blue hover:text-white transition-colors"
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

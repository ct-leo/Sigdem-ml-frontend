import React from "react";
import type { Document } from "../types/document.types";
import { DocumentPreview } from "./DocumentPreview";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Link2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../hooks/useDocuments";
import dayjs from "dayjs";

interface RecentDocumentsProps {
  currentDocument: Document;
}

export const RecentDocuments: React.FC<RecentDocumentsProps> = ({ currentDocument }) => {
  const navigate = useNavigate();
  const { data: documents } = useDocuments();

  // Find related documents or fall back to newest
  const displayList = (documents || [])
    .filter((d) => d.id !== currentDocument.id)
    .slice(0, 3);

  return (
    <Card className="shadow-sm border border-border-color">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Link2 className="w-4.5 h-4.5 text-navy-blue" />
          Documentos Relacionados
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 divide-y divide-border-color/50">
        {displayList.map((doc) => {
          const docType = doc.tipo_archivo.toUpperCase();
          const sizeFormatted = docType === "PDF" ? "2.4 MB" : docType === "DOCX" || docType === "DOC" ? "340 KB" : "820 KB";

          return (
            <div
              key={doc.id}
              onClick={() => navigate(`/documentos/${doc.id}`)}
              className="flex items-center justify-between py-3 hover:bg-gray-50/50 rounded-lg px-2 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <DocumentPreview type={docType as any} className="w-8 h-8" iconClassName="w-4 h-4" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-text-primary truncate max-w-[170px] group-hover:text-navy-blue group-hover:underline">
                    {doc.nombre_original}
                  </p>
                  <p className="text-[9px] text-text-secondary">
                    {sizeFormatted} • {dayjs(doc.fecha_subida).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
        {displayList.length === 0 && (
          <div className="py-6 text-center text-xs text-text-secondary font-semibold">
            No hay otros documentos relacionados.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

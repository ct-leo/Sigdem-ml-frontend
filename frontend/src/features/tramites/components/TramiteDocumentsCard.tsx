import React from "react";
import type { TramiteDocument } from "../types/tramite.types";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { FileText, Download, Eye, File } from "lucide-react";
import dayjs from "dayjs";

interface Props {
  documents: TramiteDocument[];
}

export const TramiteDocumentsCard: React.FC<Props> = ({ documents }) => {
  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos Adjuntos ({documents.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-6">
            <File className="w-8 h-8 text-border-color mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No hay documentos adjuntos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border-color/50 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 bg-light-bg rounded-lg shrink-0">
                    <FileText className="w-5 h-5 text-navy-blue" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{doc.name}</p>
                    <div className="flex items-center text-xs text-text-secondary mt-0.5 gap-2">
                      <span>{formatBytes(doc.size)}</span>
                      <span>•</span>
                      <span>{dayjs(doc.uploadedAt).format("DD/MM/YYYY")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-text-secondary hover:text-navy-blue hover:bg-light-bg rounded-md transition-colors" title="Visualizar">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-text-secondary hover:text-municipal-green hover:bg-light-bg rounded-md transition-colors" title="Descargar">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

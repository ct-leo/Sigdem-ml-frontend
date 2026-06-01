import React, { useState } from "react";
import type { Document } from "../types/document.types";
import { DocumentPreview } from "./DocumentPreview";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import { useDownloadDocument } from "../hooks/useDownloadDocument";
import { motion } from "framer-motion";
import dayjs from "dayjs";

interface DocumentViewerProps {
  document: Document;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2; // Simulated multipage PDF viewer
  const downloadMutation = useDownloadDocument();

  const handleZoomIn = () => setZoom((z) => Math.min(200, z + 25));
  const handleZoomOut = () => setZoom((z) => Math.max(50, z - 25));

  const handleDownload = () => {
    downloadMutation.mutate({ id: document.id, nombre_original: document.nombre_original });
  };

  const docType = document.tipo_archivo.toUpperCase();
  const sizeFormatted = docType === "PDF" ? "2.4 MB" : docType === "DOCX" || docType === "DOC" ? "340 KB" : "820 KB";

  // Content render helper
  const renderPreviewContent = () => {
    const scaleStyle = { transform: `scale(${zoom / 100})`, transformOrigin: "top center" };

    if (docType === "PDF") {
      return (
        <div className="flex flex-col items-center py-8 px-4 overflow-auto h-full w-full">
          <motion.div
            style={scaleStyle}
            className="w-full max-w-[580px] min-h-[750px] bg-white shadow-lg border border-gray-300 rounded p-12 transition-transform duration-200 select-none flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-start border-b-2 border-navy-blue pb-4 mb-6">
                <div>
                  <h4 className="font-bold text-navy-blue text-sm uppercase tracking-wide">
                    Municipalidad de SIGDEM-ML
                  </h4>
                  <p className="text-[10px] text-text-secondary">
                    Plaza de Armas s/n, Central Telefónica: (01) 440-2000
                  </p>
                </div>
                <div className="bg-navy-blue/10 text-navy-blue font-bold px-2 py-1 rounded text-[10px]">
                  Página {currentPage} de {totalPages}
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-6 text-xs text-text-primary leading-relaxed">
                <div className="text-center font-bold text-sm underline mb-4 uppercase">
                  {document.nombre_original.replace(".pdf", "")}
                </div>

                {currentPage === 1 ? (
                  <>
                    <p className="font-semibold text-navy-blue uppercase">CÓDIGO ÚNICO DE EXPEDIENTE: TRM-{document.tramite_id}</p>
                    <p className="font-semibold text-text-primary uppercase">NÚMERO DE ARCHIVO: DOC-{document.id}</p>
                    <div className="border border-dashed border-gray-300 p-4 rounded bg-gray-50/50">
                      <p className="font-medium text-navy-blue mb-1">
                        REGISTRO E INGRESO DIGITAL DE DOCUMENTOS
                      </p>
                      <p className="text-[11px] text-text-secondary">
                        Documento emitido y validado digitalmente por la mesa de partes electrónica
                        institucional de la Municipalidad. Aprobado en fecha{" "}
                        {dayjs(document.fecha_subida).format("DD/MM/YYYY")}.
                      </p>
                    </div>

                    <div className="space-y-3 mt-4">
                      <p>
                        Se certifica por medio de este expediente que los documentos anexos cumplen con todos
                        los términos y requisitos legales establecidos por el TUPA (Texto Único de
                        Procedimientos Administrativos).
                      </p>
                      <p>
                        El responsable asignado a la verificación de la presente carpeta es el funcionario con ID{" "}
                        <strong>#{document.uploaded_by_id}</strong> en calidad de <strong>Administrador de Expedientes</strong> para el trámite{" "}
                        <strong>#{document.tramite_id}</strong>.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="font-bold border-b pb-1 text-navy-blue">SECCIÓN II - DETALLES TÉCNICOS & ANALÍTICOS</p>
                    {document.texto_extraido ? (
                      <div className="bg-gray-50 border p-3 rounded font-mono text-[10px] whitespace-pre-wrap leading-normal text-text-secondary max-h-[300px] overflow-y-auto">
                        {document.texto_extraido}
                      </div>
                    ) : (
                      <p className="text-text-secondary italic">
                        No hay texto OCR registrado para indexación de búsquedas en esta página del visor.
                      </p>
                    )}
                    <p>
                      El presente anexo forma parte integral del archivo. Todos los datos han sido
                      debidamente validados mediante firmas digitales registradas y certificadas en Render Cloud Storage.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-6 mt-8 flex justify-between items-end">
              <div className="text-[9px] text-text-secondary">
                <p>Fecha Carga: {dayjs(document.fecha_subida).format("DD/MM/YYYY HH:mm")}</p>
                <p>ID Sistema: {document.id}</p>
              </div>
              {/* Mock Stamp */}
              <div className="flex flex-col items-center">
                <div className="border-2 border-[#749763]/70 rounded-full px-3 py-1 text-[#749763] text-[9px] font-bold rotate-[-12deg] tracking-wider select-none uppercase">
                  ✓ VERIFICADO SIGDEM
                </div>
                <span className="text-[8px] text-text-secondary mt-1">Sello de Control Digital</span>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    if (docType === "PNG" || docType === "JPG" || docType === "JPEG") {
      return (
        <div className="flex flex-col items-center py-8 px-4 overflow-auto h-full w-full justify-center">
          <motion.div
            style={scaleStyle}
            className="w-full max-w-[500px] bg-white p-4 shadow-lg border border-border-color rounded-xl flex flex-col items-center justify-center transition-transform duration-200"
          >
            <div className="w-full h-80 rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center relative">
              {/* Display a beautiful simulated geometric map/sketch representing municipal graphics */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-blue/5 to-[#749763]/5 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-navy-blue/10 flex items-center justify-center text-navy-blue mb-4">
                  <Maximize2 className="w-10 h-10 animate-pulse" />
                </div>
                <p className="font-semibold text-text-primary text-sm">{document.nombre_original}</p>
                <p className="text-xs text-text-secondary mt-1">Previsualización de Imagen Digitalizada</p>
              </div>
            </div>
            <div className="w-full mt-4 flex items-center justify-between text-xs text-text-secondary">
              <span>Ruta del Servidor: ...{document.ruta_archivo.slice(-25)}</span>
              <span>Formato: {docType}</span>
            </div>
          </motion.div>
        </div>
      );
    }

    // Spreadsheet or Word Doc Generic Preview
    const isXlsx = docType === "XLSX";
    const IconComponent = isXlsx ? FileSpreadsheet : FileText;
    const colorClass = isXlsx ? "text-green-600 bg-green-50 border-green-200" : "text-blue-600 bg-blue-50 border-blue-200";

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/50">
        <div className={`p-6 rounded-2xl border ${colorClass} shadow-md flex flex-col items-center max-w-sm text-center`}>
          <IconComponent className="w-14 h-14 mb-4" />
          <h4 className="font-bold text-text-primary text-base mb-2">Vista Previa No Disponible</h4>
          <p className="text-xs text-text-secondary leading-relaxed mb-6">
            El archivo de extensión <strong className="text-text-primary">.{docType.toLowerCase()}</strong> no admite renderizado en tiempo real dentro del visor interactivo estándar. Puede descargarlo localmente para visualizar su contenido estructurado.
          </p>
          <button
            onClick={handleDownload}
            disabled={downloadMutation.isPending}
            className="bg-navy-blue hover:bg-blue-800 text-white text-xs font-semibold py-2 px-4 rounded-lg shadow transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Descargar archivo
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-xl border border-border-color shadow-sm h-[780px] overflow-hidden">
      {/* Control bar */}
      <div className="bg-white border-b border-border-color px-4 py-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <DocumentPreview type={docType as any} className="w-9 h-9" />
          <div>
            <h3 className="font-bold text-text-primary text-sm truncate max-w-[200px] md:max-w-[320px]">
              {document.nombre_original}
            </h3>
            <p className="text-[10px] text-text-secondary">
              {sizeFormatted} • {dayjs(document.fecha_subida).format("DD MMM, YYYY")}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {/* Zoom controls */}
          {(docType === "PDF" || docType === "PNG" || docType === "JPG" || docType === "JPEG") && (
            <div className="flex items-center border border-border-color rounded-lg bg-gray-50 p-0.5">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="p-1 rounded text-text-secondary hover:bg-white hover:text-text-primary disabled:opacity-30 transition-colors"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-text-primary min-w-[40px] text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="p-1 rounded text-text-secondary hover:bg-white hover:text-text-primary disabled:opacity-30 transition-colors"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Page controls (only for PDF) */}
          {docType === "PDF" && (
            <div className="flex items-center border border-border-color rounded-lg bg-gray-50 p-0.5 ml-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded text-text-secondary hover:bg-white hover:text-text-primary disabled:opacity-30 transition-colors"
                title="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-text-primary min-w-[70px] text-center">
                {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded text-text-secondary hover:bg-white hover:text-text-primary disabled:opacity-30 transition-colors"
                title="Página siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={downloadMutation.isPending}
            className="p-1.5 rounded-lg border border-border-color text-text-secondary hover:bg-gray-50 transition-colors ml-1 disabled:opacity-50"
            title="Descargar archivo"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Preview Frame */}
      <div className="flex-1 overflow-auto relative flex bg-gray-200/50 justify-center">
        {renderPreviewContent()}
      </div>
    </div>
  );
};

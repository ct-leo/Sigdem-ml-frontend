import React, { useState } from "react";
import {
  FileText,
  Download,
  AlertCircle,
  Loader2,
  Brain,
  Hash,
  Calendar,
  User,
  Briefcase,
  CheckCircle2,
  Clock,
} from "lucide-react";
import type { CV } from "../../cvs/types/cv.types";
import { cvsService } from "../../cvs/services/cvs.service";
import { toast } from "sonner";
import { motion } from "framer-motion";
import dayjs from "dayjs";

interface CVViewerProps {
  cv: CV;
  jobTitle?: string;
}

export const CVViewer: React.FC<CVViewerProps> = ({ cv, jobTitle }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const fileExt = cv.nombre_original.split(".").pop()?.toUpperCase() ?? "PDF";
  const isPDF = fileExt === "PDF";

  // ── Authenticated download via /cvs/{id}/download ─────────────────────────
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const blob = await cvsService.downloadCV(cv.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", cv.nombre_original);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Descarga de "${cv.nombre_original}" iniciada`);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 404) {
        toast.error(
          "El endpoint de descarga no está disponible aún en el servidor. Contacte al administrador del backend."
        );
      } else {
        toast.error("No se pudo descargar el archivo.");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const initials = cv.nombre_candidato
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden flex flex-col">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-50/80 border-b border-border-color">
        <div className="flex items-center gap-2">
          <FileText className="w-4.5 h-4.5 text-navy-blue" />
          <h3 className="text-sm font-black text-text-primary uppercase tracking-wider">
            Expediente del Candidato
          </h3>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-navy-blue hover:bg-blue-900 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {isDownloading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          {isDownloading ? "Descargando..." : "Descargar CV"}
        </button>
      </div>

      {/* ── Main content: premium CV card ─────────────────────────────────── */}
      <div className="p-5 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-border-color rounded-xl overflow-hidden shadow-sm"
        >
          {/* Document header banner */}
          <div className="bg-gradient-to-r from-navy-blue via-blue-800 to-navy-blue px-8 py-6 flex items-center gap-5 relative overflow-hidden">
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.08) 10px, rgba(255,255,255,.08) 20px)",
              }}
            />
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-white font-black text-xl uppercase shrink-0 z-10">
              {initials}
            </div>
            <div className="z-10">
              <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">
                Expediente ATS — CV-{cv.id}
              </p>
              <h2 className="text-xl font-black text-white leading-tight">
                {cv.nombre_candidato}
              </h2>
              {jobTitle && (
                <p className="text-xs text-white/70 font-medium mt-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Postulante a: {jobTitle}
                </p>
              )}
            </div>

            {/* NLP status chip */}
            <div className="ml-auto z-10">
              {cv.texto_procesado === "SI" ? (
                <span className="flex items-center gap-1.5 bg-[#749763]/20 border border-[#749763]/40 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3c98e]" />
                  NLP Procesado
                </span>
              ) : (
                <span className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  Pendiente NLP
                </span>
              )}
            </div>
          </div>

          {/* Document body */}
          <div className="p-6 bg-white space-y-5">
            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-border-color/50">
                <User className="w-4 h-4 text-navy-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-[9px] uppercase font-bold text-text-secondary tracking-wider">
                    Candidato
                  </p>
                  <p className="text-xs font-semibold text-text-primary mt-0.5">
                    {cv.nombre_candidato}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-border-color/50">
                <Hash className="w-4 h-4 text-navy-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-[9px] uppercase font-bold text-text-secondary tracking-wider">
                    Convocatoria
                  </p>
                  <p className="text-xs font-bold text-navy-blue mt-0.5">
                    CONV-{cv.job_id}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-border-color/50">
                <Calendar className="w-4 h-4 text-navy-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-[9px] uppercase font-bold text-text-secondary tracking-wider">
                    Fecha de Carga
                  </p>
                  <p className="text-xs font-semibold text-text-primary mt-0.5">
                    {dayjs(cv.fecha_subida).format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-border-color/50">
                <FileText className="w-4 h-4 text-navy-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-[9px] uppercase font-bold text-text-secondary tracking-wider">
                    Archivo Original
                  </p>
                  <p className="text-xs font-semibold text-text-primary mt-0.5 truncate max-w-[150px]">
                    {cv.nombre_original}
                  </p>
                </div>
              </div>
            </div>

            {/* NLP Extracted Text preview */}
            {cv.texto_procesado === "SI" && cv.texto_extraido ? (
              <div className="border border-[#749763]/30 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#749763]/8 border-b border-[#749763]/20">
                  <Brain className="w-4 h-4 text-[#749763]" />
                  <span className="text-xs font-black text-text-primary uppercase tracking-wider">
                    Contenido Extraído por NLP
                  </span>
                  <span className="ml-auto text-[9px] font-bold text-[#749763] uppercase">
                    Motor IA
                  </span>
                </div>
                <pre className="text-[11px] text-text-secondary leading-relaxed whitespace-pre-wrap font-mono bg-gray-50 p-4 max-h-[260px] overflow-y-auto">
                  {cv.texto_extraido.slice(0, 1200)}
                  {cv.texto_extraido.length > 1200 && (
                    <span className="text-navy-blue font-bold">
                      {"\n"}... (ver panel de extracción para texto completo)
                    </span>
                  )}
                </pre>
              </div>
            ) : (
              /* Pending NLP notice */
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-amber-800">
                    Texto pendiente de extracción
                  </p>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Usa el botón "Extraer Texto NLP" para procesar el contenido del documento.
                  </p>
                </div>
              </div>
            )}

            {/* Download CTA */}
            <div className="flex items-center justify-between pt-2 border-t border-border-color/50">
              <div className="flex items-center gap-2 text-[10px] text-text-secondary uppercase font-semibold tracking-wider">
                <span className={`w-2 h-2 rounded-full ${isPDF ? "bg-red-500" : "bg-blue-500"}`} />
                Tipo: {fileExt}
              </div>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-1.5 text-xs font-bold text-navy-blue hover:text-blue-800 transition-colors disabled:opacity-60"
              >
                {isDownloading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                Descargar archivo original ({fileExt})
              </button>
            </div>
          </div>

          {/* Document footer stamp */}
          <div className="px-6 py-3 bg-gray-50 border-t border-border-color flex items-center justify-between">
            <span className="text-[9px] text-text-secondary uppercase tracking-wider">
              Sistema de Gestión de Documentos Municipales — SIGDEM-ML
            </span>
            <div className="flex items-center gap-1.5 border border-[#749763]/50 rounded-full px-2 py-0.5">
              <CheckCircle2 className="w-3 h-3 text-[#749763]" />
              <span className="text-[9px] font-bold text-[#749763] uppercase tracking-wider">
                Registrado
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="border-t border-border-color px-5 py-3 bg-gray-50/50 flex flex-wrap items-center gap-4 text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
        <span>
          Archivo: <span className="text-text-primary font-bold">{cv.nombre_original}</span>
        </span>
        <span>·</span>
        <span>
          Tipo: <span className="text-text-primary font-bold">{fileExt}</span>
        </span>
        <span>·</span>
        <span className="text-[#749763] font-bold">
          ✓ Expediente registrado en el sistema
        </span>
      </div>
    </div>
  );
};

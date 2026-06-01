import React, { useEffect } from "react";
import { X, Sparkles, User, Mail, Phone, Calendar, Brain, FileText, AlertTriangle, ShieldCheck } from "lucide-react";
import { useCV } from "../../cvs/hooks/useCV";
import { useCVMatch } from "../hooks/useCVMatch";
import { getCompatibilityColor, getCompatibilityLevel, getCompatibilityProgressColor } from "../utils/compatibility.utils";
import { motion, AnimatePresence } from "framer-motion";

interface CandidateMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvId: number;
  jobId: number;
}

export const CandidateMatchModal: React.FC<CandidateMatchModalProps> = ({
  isOpen,
  onClose,
  cvId,
  jobId,
}) => {
  const { data: cv, isLoading: isLoadingCV } = useCV(cvId);
  const { mutate: runMatch, data: matchData, isPending: isMatching, error: matchError } = useCVMatch();

  // Run NLP match analysis automatically when modal opens and we have ids
  useEffect(() => {
    if (isOpen && cvId && jobId) {
      runMatch({ cv_id: cvId, job_id: jobId });
    }
  }, [isOpen, cvId, jobId, runMatch]);

  if (!isOpen) return null;

  const compatibility = matchData?.compatibilidad ?? 0;
  const level = getCompatibilityLevel(compatibility);
  const colorClass = getCompatibilityColor(compatibility);
  const progressColor = getCompatibilityProgressColor(compatibility);

  // SVG Circular Progress values
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (compatibility / 100) * circumference;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-navy-blue to-blue-900 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <h2 className="text-base font-black tracking-wide uppercase">
                Análisis Cognitivo y Contraste NLP (IA)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
            {isLoadingCV || isMatching ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-slate-500">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full"
                />
                <p className="text-xs font-bold uppercase tracking-wider animate-pulse text-blue-600 dark:text-blue-400">
                  Orquestando motores NLP y Similarity Metrics...
                </p>
              </div>
            ) : matchError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2 uppercase">Error de Procesamiento</h3>
                <p className="text-xs text-slate-500 max-w-md font-semibold">
                  No se pudo procesar la comparación NLP del candidato. Por favor, asegúrese de que el backend esté disponible.
                </p>
              </div>
            ) : (
              <>
                {/* Upper Grid: Candidate Basic Profile & NLP Scoring Progress */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Candidate Real Profile Details */}
                  <div className="md:col-span-7 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase leading-none">
                          {cv?.nombre_candidato || matchData?.candidato}
                        </h3>
                        <p className="text-2xs font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase">
                          Expediente de Candidatura ATS
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{cv?.correo_candidato || "No especificado"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{cv?.telefono_candidato || "No especificado"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Carga: {cv?.fecha_subida ? new Date(cv.fecha_subida).toLocaleDateString() : "Reciente"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-semibold">
                        <Brain className="w-4 h-4 text-slate-400" />
                        <span className="flex items-center gap-1 font-bold uppercase text-2xs">
                          Estado NLP:
                          <span className={`px-1.5 py-0.5 rounded text-2xs leading-none ${cv?.texto_procesado === "SI" ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600" : "bg-amber-100 dark:bg-amber-950 text-amber-600"}`}>
                            {cv?.texto_procesado === "SI" ? "PROCESADO" : "PENDIENTE"}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span className="text-2xs font-bold text-slate-500 uppercase truncate">
                        Archivo original: {cv?.nombre_original || "currículum.pdf"}
                      </span>
                    </div>
                  </div>

                  {/* Circular Score Visualizer */}
                  <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r={radius}
                          stroke="#e2e8f0"
                          strokeWidth="8"
                          fill="transparent"
                          className="dark:stroke-slate-800"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r={radius}
                          stroke={progressColor}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-slate-800 dark:text-white leading-none">
                          {compatibility}%
                        </span>
                        <span className="text-3xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                          Score IA
                        </span>
                      </div>
                    </div>
                    <span className={`mt-3 px-3 py-1 rounded-full text-2xs font-extrabold uppercase border ${colorClass}`}>
                      {level}
                    </span>
                  </div>
                </div>

                {/* Cognitive NLP Result Section */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <Brain className="w-4 h-4 text-indigo-500" />
                    <h4 className="text-2xs font-extrabold uppercase text-slate-800 dark:text-white tracking-wider">
                      Dictamen del Modelo NLP & Cosine Similarity
                    </h4>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold italic">
                      "{matchData?.resultado || "Análisis completado exitosamente sin observaciones adicionales."}"
                    </p>
                  </div>
                </div>

                {/* Futuras Capacidades (Bert/Embeddings space preparation) */}
                <div className="flex flex-col gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <h4 className="text-3xs font-black uppercase text-slate-400 tracking-wider">
                      Soporte para Mapeo de Competencias Avanzadas (Próxima Versión BERT/LLM)
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <div className="p-2 border border-dashed border-slate-200 dark:border-slate-800 rounded bg-slate-50/50 dark:bg-transparent">
                      <span className="block text-3xs font-extrabold text-slate-400 uppercase leading-none mb-1">Skills Detectadas</span>
                      <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Próximamente con spaCy</span>
                    </div>
                    <div className="p-2 border border-dashed border-slate-200 dark:border-slate-800 rounded bg-slate-50/50 dark:bg-transparent">
                      <span className="block text-3xs font-extrabold text-slate-400 uppercase leading-none mb-1">Experiencia Mapeada</span>
                      <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Próximamente con LLMs</span>
                    </div>
                    <div className="p-2 border border-dashed border-slate-200 dark:border-slate-800 rounded bg-slate-50/50 dark:bg-transparent">
                      <span className="block text-3xs font-extrabold text-slate-400 uppercase leading-none mb-1">Educación Clave</span>
                      <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Próximamente BERT</span>
                    </div>
                    <div className="p-2 border border-dashed border-slate-200 dark:border-slate-800 rounded bg-slate-50/50 dark:bg-transparent">
                      <span className="block text-3xs font-extrabold text-slate-400 uppercase leading-none mb-1">Certificaciones</span>
                      <span className="text-2xs font-semibold text-slate-600 dark:text-slate-400">Próximamente Embeddings</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase rounded-lg bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors"
            >
              Cerrar Dictamen
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

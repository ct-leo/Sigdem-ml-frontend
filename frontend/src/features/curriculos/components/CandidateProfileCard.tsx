import React from "react";
import { Mail, Phone, Calendar, Hash, Briefcase, Brain } from "lucide-react";
import { CVNLPStatusBadge } from "./CVNLPStatusBadge";
import type { CV } from "../../cvs/types/cv.types";
import dayjs from "dayjs";

interface CandidateProfileCardProps {
  cv: CV;
  jobTitle?: string; // resolved from job_id
}

export const CandidateProfileCard: React.FC<CandidateProfileCardProps> = ({
  cv,
  jobTitle,
}) => {
  const initials = cv.nombre_candidato
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-border-color shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="h-20 bg-gradient-to-r from-navy-blue via-blue-800 to-navy-blue/80 relative">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)",
          }}
        />
      </div>

      {/* Avatar + name */}
      <div className="px-6 pb-5">
        {/* CAMBIO AQUÍ: Se agregó 'relative z-10' para que se renderice sobre el banner */}
        <div className="relative z-10 -mt-9 mb-4 flex items-end justify-between">
          <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-navy-blue font-black text-xl uppercase">
            {initials}
          </div>
          <CVNLPStatusBadge status={cv.texto_procesado} />
        </div>

        <h2 className="text-lg font-black text-text-primary leading-tight">
          {cv.nombre_candidato}
        </h2>
        {jobTitle && (
          <p className="flex items-center gap-1.5 text-xs font-bold text-navy-blue uppercase tracking-wide mt-1">
            <Briefcase className="w-3.5 h-3.5" />
            Postulante a: {jobTitle}
          </p>
        )}

        {/* Contact info */}
        <div className="mt-4 space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs text-text-secondary">
            <Mail className="w-3.5 h-3.5 shrink-0 text-navy-blue/60" />
            <span className="truncate">{cv.correo_candidato}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-text-secondary">
            <Phone className="w-3.5 h-3.5 shrink-0 text-navy-blue/60" />
            <span>{cv.telefono_candidato}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-text-secondary">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-navy-blue/60" />
            <span>
              Registrado el{" "}
              {dayjs(cv.fecha_subida).format("DD/MM/YYYY [a las] HH:mm")}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-text-secondary">
            <Hash className="w-3.5 h-3.5 shrink-0 text-navy-blue/60" />
            <span>
              Expediente{" "}
              <span className="font-bold text-text-primary">CV-{cv.id}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-text-secondary">
            <Brain className="w-3.5 h-3.5 shrink-0 text-navy-blue/60" />
            <span>
              Estado NLP:{" "}
              <span className={`font-bold ${cv.texto_procesado === "SI" ? "text-[#749763]" : "text-amber-600"}`}>
                {cv.texto_procesado === "SI" ? "Procesado" : "Pendiente de extracción"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
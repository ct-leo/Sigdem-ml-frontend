import React from "react";
import type { Curriculum } from "../types/curriculum.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { User, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";
import dayjs from "dayjs";

interface CandidateInfoCardProps {
  cv: Curriculum;
}

export const CandidateInfoCard: React.FC<CandidateInfoCardProps> = ({ cv }) => {
  return (
    <Card className="shadow-sm border border-border-color select-none">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <User className="w-4.5 h-4.5 text-navy-blue" />
          Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3.5">
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Nombre Completo</p>
              <p className="text-xs font-semibold text-text-primary">{cv.candidateName}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Correo Electrónico</p>
              <p className="text-xs font-semibold text-text-primary">{cv.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Teléfono de Contacto</p>
              <p className="text-xs font-semibold text-text-primary">{cv.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Residencia</p>
              <p className="text-xs font-semibold text-text-primary">{cv.city}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Fecha de Registro</p>
              <p className="text-xs font-semibold text-text-primary">
                {dayjs(cv.registrationDate).format("DD/MM/YYYY HH:mm")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-text-secondary mt-0.5" />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary">Experiencia Registrada</p>
              <p className="text-xs font-bold text-[#749763]">{cv.experienceYears} Años en el sector</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

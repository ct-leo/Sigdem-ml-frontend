import React from "react";
import type { Curriculum } from "../types/curriculum.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Award, Shield } from "lucide-react";

interface CandidateCertificationsCardProps {
  cv: Curriculum;
}

export const CandidateCertificationsCard: React.FC<CandidateCertificationsCardProps> = ({ cv }) => {
  return (
    <Card className="shadow-sm border border-border-color select-none">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4.5 h-4.5 text-navy-blue" />
          Certificaciones
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {cv.certifications.length > 0 ? (
          cv.certifications.map((cert, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-gray-50/40 border border-border-color/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2.5 bg-[#749763]/10 rounded-lg text-[#749763] shrink-0 h-10 w-10 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-secondary uppercase">
                  Otorgado en el año: {cert.date}
                </span>
                <h4 className="text-sm font-black text-text-primary mt-0.5">{cert.name}</h4>
                <p className="text-xs text-text-secondary">{cert.entity}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-text-secondary italic text-center p-4 bg-gray-50 rounded-lg border border-dashed border-border-color">
            No se han indexado certificaciones técnicas en este expediente.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

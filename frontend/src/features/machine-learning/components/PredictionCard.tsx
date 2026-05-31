import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Star } from "lucide-react";

interface FeatureImportance {
  feature: string;
  weight: number; // percentage
  color: string;
}

export const PredictionCard: React.FC = () => {
  const importances: FeatureImportance[] = [
    { feature: "Tipo de Procedimiento (TUPA)", weight: 35, color: "bg-navy-blue" },
    { feature: "Área Destinataria Responsable", weight: 28, color: "bg-[#749763]" },
    { feature: "Historial de Solicitudes Previas", weight: 22, color: "bg-golden-sand" },
    { feature: "Presencia y Tipo de Adjuntos (OCR)", weight: 15, color: "bg-danger" },
  ];

  return (
    <Card className="shadow-sm border border-border-color h-full flex flex-col ">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Star className="w-4.5 h-4.5 text-navy-blue" />
          Importancia de Variables (Feature Weights)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <p className="text-xs text-text-secondary mb-20 leading-normal">
          Peso proporcional asignado por el modelo Random Forest a los criterios evaluados durante la priorización.
        </p>

        <div className="space-y-20">
          {importances.map((imp, idx) => (
            <div key={idx} className="space-y-1.5 select-none">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-primary">{imp.feature}</span>
                <span className="font-mono font-bold text-navy-blue">{imp.weight}%</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden border border-border-color/20">
                <div className={`h-full ${imp.color}`} style={{ width: `${imp.weight}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

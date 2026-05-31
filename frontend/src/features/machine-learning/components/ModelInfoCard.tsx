import React from "react";
import type { MLModel } from "../types/ml.types";
import { MLStatusBadge } from "./MLStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Brain, Cpu, Database, Award, Calendar } from "lucide-react";
import dayjs from "dayjs";

interface ModelInfoCardProps {
  model?: MLModel;
  isLoading: boolean;
}

export const ModelInfoCard: React.FC<ModelInfoCardProps> = ({ model, isLoading }) => {
  if (isLoading || !model) {
    return (
      <div className="bg-white rounded-xl border border-border-color p-6 animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border border-border-color overflow-hidden">
      <CardHeader className="bg-navy-blue text-white px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <Brain className="w-5 h-5 text-golden-sand animate-pulse" />
          Modelo Activo
        </CardTitle>
        <MLStatusBadge status={model.status} />
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div>
          <h4 className="text-lg font-black text-text-primary flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-text-secondary" />
            {model.name}
          </h4>
          <p className="text-xs text-text-secondary mt-1">
            Algoritmo de clasificación supervisado para priorización inteligente de expedientes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-light-bg rounded-lg text-text-secondary">
              <Award className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase">Versión</p>
              <p className="text-xs font-semibold text-text-primary">{model.version}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-light-bg rounded-lg text-text-secondary">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase">Actualización</p>
              <p className="text-xs font-semibold text-text-primary">
                {dayjs(model.lastUpdatedAt).format("DD/MM/YYYY HH:mm")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-light-bg rounded-lg text-text-secondary">
              <Database className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase">Set de Entrenamiento</p>
              <p className="text-xs font-semibold text-text-primary">
                {model.trainedRecordsCount.toLocaleString()} Registros
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#749763]/10 rounded-lg text-[#749763]">
              <Brain className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase">Predicciones Totales</p>
              <p className="text-xs font-black text-dashboard-green">
                {model.totalPredictionsCount.toLocaleString()} Inferencias
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import React from "react";
import type { ConfusionMatrixData } from "../types/ml.types";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { Target } from "lucide-react";

interface ConfusionMatrixProps {
  data?: ConfusionMatrixData;
  isLoading: boolean;
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return (
      <div className="bg-white rounded-xl border border-border-color p-6 animate-pulse h-[360px]">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-5 gap-2 h-full">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="bg-gray-150 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const { labels, matrix } = data;

  const getCellColor = (actual: string, predicted: string, percentage: number) => {
    const isDiagonal = actual === predicted;
    if (isDiagonal) {
      // True Positives - green scale
      if (percentage > 95) return "bg-[#749763] text-white";
      if (percentage > 90) return "bg-[#749763]/80 text-white";
      return "bg-[#749763]/50 text-text-primary";
    }
    // Errors - red/amber scale
    if (percentage === 0) return "bg-gray-50 text-text-secondary/40";
    if (percentage > 5) return "bg-red-100 text-[#DC2626] font-semibold";
    return "bg-amber-50 text-golden-sand font-medium";
  };

  const getCellData = (actual: string, predicted: string) => {
    return matrix.find((c) => c.actual === actual && c.predicted === predicted);
  };

  return (
    <Card className="shadow-sm border border-border-color h-full">
      <CardHeader className="bg-gray-50/50 border-b border-border-color/50 px-6 py-4">
        <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4.5 h-4.5 text-navy-blue" />
          Matriz de Confusión (Random Forest)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex flex-col justify-between">
        <p className="text-xs text-text-secondary mb-6 leading-normal">
          Correlación entre la clasificación real (Filas) y la predicción inferida por la IA (Columnas).
          Las celdas diagonales verdes representan aciertos exactos (True Positives).
        </p>

        {/* Matrix Grid */}
        <div className="w-full overflow-x-auto select-none">
          <div className="min-w-[480px] grid grid-cols-5 gap-2 text-center text-xs">
            {/* Header: Actual \ Predicted */}
            <div className="flex items-center justify-center font-bold text-text-secondary border border-transparent p-2 text-[10px] uppercase">
              Actual \ Pred
            </div>

            {/* Columns headers */}
            {labels.map((label) => (
              <div
                key={`col-${label}`}
                className="flex flex-col items-center justify-center font-bold text-navy-blue p-2 border border-navy-blue/10 bg-navy-blue/5 rounded-lg"
              >
                <span>{label}</span>
                <span className="text-[9px] text-text-secondary lowercase font-medium">predicho</span>
              </div>
            ))}

            {/* Rows & Cells */}
            {labels.map((rowLabel) => (
              <React.Fragment key={`row-frag-${rowLabel}`}>
                {/* Row Header */}
                <div className="flex flex-col items-center justify-center font-bold text-dashboard-green p-2 border border-dashboard-green/10 bg-[#749763]/5 rounded-lg text-left">
                  <span>{rowLabel}</span>
                  <span className="text-[9px] text-text-secondary lowercase font-medium">real</span>
                </div>

                {/* Cells */}
                {labels.map((colLabel) => {
                  const cell = getCellData(rowLabel, colLabel);
                  const isDiagonal = rowLabel === colLabel;
                  return (
                    <div
                      key={`cell-${rowLabel}-${colLabel}`}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border border-border-color/40 shadow-sm transition-all duration-200 hover:scale-[1.02] ${getCellColor(
                        rowLabel,
                        colLabel,
                        cell?.percentage || 0
                      )}`}
                    >
                      {cell ? (
                        <>
                          <span className="font-extrabold text-sm">{cell.count}</span>
                          <span className="text-[9.5px] opacity-90">{cell.percentage}%</span>
                          <span className="text-[8px] uppercase tracking-wider font-semibold opacity-70 mt-1">
                            {isDiagonal ? "TP" : cell.percentage > 4 ? "FN" : "FP"}
                          </span>
                        </>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border-color/60 text-[10px] text-text-secondary uppercase font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-[#749763] rounded border border-border-color"></span>
            Aciertos (Clasificación Correcta)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-red-100 rounded border border-border-color"></span>
            Fallas Significativas (&gt;5% error)
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-amber-50 rounded border border-border-color"></span>
            Desviaciones Menores
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

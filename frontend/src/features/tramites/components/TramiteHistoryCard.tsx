import React from "react";
import type { TramiteHistory } from "../types/tramite.types";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { TramiteTimeline } from "./TramiteTimeline";

interface Props {
  history: TramiteHistory[];
}

export const TramiteHistoryCard: React.FC<Props> = ({ history }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Movimientos</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <TramiteTimeline history={history} />
      </CardContent>
    </Card>
  );
};

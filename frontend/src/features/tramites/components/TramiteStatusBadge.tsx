import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { TramiteStatus } from "../types/tramite.types";

interface Props {
  status: TramiteStatus;
}

export const TramiteStatusBadge: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'Aprobado':
      return <Badge variant="success">{status}</Badge>;
    case 'Rechazado':
      return <Badge variant="danger">{status}</Badge>;
    case 'En Revisión':
      return <Badge variant="warning">{status}</Badge>;
    case 'Observado':
      return <Badge variant="warning">{status}</Badge>;
    case 'Registrado':
    default:
      return <Badge variant="info">{status}</Badge>;
  }
};

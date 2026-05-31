import React from "react";
import { Badge } from "../../../components/ui/Badge";
import type { TramitePriority } from "../types/tramite.types";

interface Props {
  priority: TramitePriority;
}

export const TramitePriorityBadge: React.FC<Props> = ({ priority }) => {
  switch (priority) {
    case 'Crítica':
      return <Badge variant="danger">{priority}</Badge>;
    case 'Alta':
      return <Badge variant="warning">{priority}</Badge>;
    case 'Media':
      return <Badge variant="info">{priority}</Badge>;
    case 'Baja':
    default:
      return <Badge variant="default">{priority}</Badge>;
  }
};

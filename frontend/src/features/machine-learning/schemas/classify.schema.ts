import { z } from "zod";

export const classifySchema = z.object({
  tipo_tramite: z.string().min(1, "El tipo de trámite es obligatorio"),
  area_responsable: z.string().min(1, "El área responsable es obligatoria"),
  dias_espera: z.number().min(0, "Debe ser mayor o igual a 0"),
  cantidad_documentos: z.number().min(0, "Debe ser mayor o igual a 0"),
  tiene_observaciones: z.boolean().default(false),
  es_urgente: z.boolean().default(false),
});

export type ClassifyFormValues = z.infer<typeof classifySchema>;

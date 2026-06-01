import { z } from "zod";

export const newTramiteSchema = z.object({
  tipo_tramite: z.string().min(1, "El tipo de trámite es requerido"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  correo_solicitante: z.string().email("Correo electrónico inválido"),
  area_responsable: z.string().min(1, "El área responsable es requerida"),
});

export type NewTramiteFormValues = z.infer<typeof newTramiteSchema>;

export const editTramiteSchema = z.object({
  tipo_tramite: z.string().min(1, "El tipo de trámite es requerido"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  correo_solicitante: z.string().email("Correo electrónico inválido"),
  area_responsable: z.string().min(1, "El área responsable es requerida"),
  prioridad: z.enum(["BAJA", "MEDIA", "ALTA", "CRITICA"], {
    errorMap: () => ({ message: "Prioridad inválida" })
  }),
  analista_id: z.number().nullable().optional(),
});

export type EditTramiteFormValues = z.infer<typeof editTramiteSchema>;

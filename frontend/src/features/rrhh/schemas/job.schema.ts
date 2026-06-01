import { z } from "zod";

export const jobSchema = z.object({
  titulo: z.string().min(1, "El título de la convocatoria es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  requisitos: z.string().min(1, "Los requisitos son obligatorios"),
  area: z.string().min(1, "El área es obligatoria"),
  modalidad: z.string().min(1, "La modalidad es obligatoria"),
  ubicacion: z.string().min(1, "La ubicación es obligatoria"),
  estado: z.enum(["ABIERTA", "PAUSADA", "CERRADA"]).optional(),
});

export type JobFormValues = z.infer<typeof jobSchema>;

import { z } from "zod";

const fileSchema = z.custom<File>((val) => val instanceof File, "Por favor adjunta un archivo válido.");

export const newTramiteSchema = z.object({
  type: z.string().min(1, "El tipo de trámite es requerido"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  applicantEmail: z.string().email("Correo electrónico inválido"),
  priority: z.enum(["Baja", "Media", "Alta", "Crítica"], {
    errorMap: () => ({ message: "Prioridad inválida" })
  }),
  responsibleArea: z.string().min(1, "El área responsable es requerida"),
  observations: z.string().optional(),
  files: z.array(fileSchema).min(1, "Debes adjuntar al menos un documento"),
});

export type NewTramiteFormValues = z.infer<typeof newTramiteSchema>;

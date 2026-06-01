import { z } from "zod";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const ACCEPTED_TYPES = ["application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export const uploadCVSchema = z.object({
  nombre_candidato: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(150, "Máximo 150 caracteres"),

  correo_candidato: z
    .string()
    .email("Ingrese un correo electrónico válido")
    .max(200, "Máximo 200 caracteres"),

  telefono_candidato: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "Máximo 20 caracteres"),

  job_id: z
    .number({ required_error: "Debe seleccionar una convocatoria" })
    .int()
    .positive("Debe seleccionar una convocatoria válida"),

  file: z
    .instanceof(File, { message: "Debe adjuntar un archivo" })
    .refine((f) => f.size <= MAX_FILE_SIZE, {
      message: "El archivo no debe superar 20 MB",
    })
    .refine((f) => ACCEPTED_TYPES.includes(f.type), {
      message: "Solo se permiten archivos PDF, DOC o DOCX",
    }),
});

export type UploadCVFormValues = z.infer<typeof uploadCVSchema>;

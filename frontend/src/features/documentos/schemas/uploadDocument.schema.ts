import { z } from "zod";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/msword", // doc
  "image/png",
  "image/jpeg",
  "image/jpg"
];

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export const uploadDocumentSchema = z.object({
  tramite_id: z.number({ required_error: "El ID de trámite es obligatorio" }).min(1, "Seleccione un trámite válido"),
  file: z
    .any()
    .refine((file) => file instanceof File, "Debe seleccionar un archivo válido")
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      "El tamaño del archivo no debe exceder los 20 MB"
    )
    .refine(
      (file) => file && ALLOWED_MIME_TYPES.includes(file.type),
      "Formato no permitido. Solo se aceptan PDF, DOC, DOCX, PNG, JPG o JPEG"
    ),
});

export type UploadDocumentFormValues = z.infer<typeof uploadDocumentSchema>;

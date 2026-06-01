import { z } from "zod";

export const sendNotificationSchema = z.object({
  destinatario: z
    .string()
    .min(1, "El destinatario es requerido")
    .email("Ingrese un correo electrónico válido"),
  asunto: z
    .string()
    .min(3, "El asunto debe tener al menos 3 caracteres")
    .max(100, "El asunto no puede exceder los 100 caracteres"),
  mensaje: z
    .string()
    .min(5, "El mensaje debe tener al menos 5 caracteres")
    .max(1000, "El mensaje no puede exceder los 1000 caracteres"),
  tramite_id: z.string().optional(),
});

export type SendNotificationFormValues = z.infer<typeof sendNotificationSchema>;

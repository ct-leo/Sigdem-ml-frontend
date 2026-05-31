import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El correo es obligatorio").email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
  remember: z.boolean().optional(),
});

export interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

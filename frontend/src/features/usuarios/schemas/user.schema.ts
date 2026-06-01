import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(3, "El nombre completo debe tener al menos 3 caracteres"),
  email: z.string().email("El correo electrónico no es válido"),
  role: z.enum(["ADMIN", "RECEPCIONISTA", "ANALISTA", "RRHH"], {
    errorMap: () => ({ message: "El rol es obligatorio" }),
  }),
  status: z.enum(["Activo", "Inactivo", "Suspendido", "Bloqueado"], {
    errorMap: () => ({ message: "El estado es obligatorio" }),
  }),
  phone: z.string().regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos numéricos"),
  position: z.string().min(2, "El cargo debe tener al menos 2 caracteres"),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password.length > 0) {
    return data.password.length >= 6;
  }
  return true;
}, {
  message: "La contraseña debe tener al menos 6 caracteres",
  path: ["password"],
}).refine((data) => {
  return data.password === data.confirmPassword;
}, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type UserSchemaInput = z.infer<typeof userSchema>;

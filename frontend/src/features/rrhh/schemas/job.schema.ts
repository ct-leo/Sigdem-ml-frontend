import { z } from "zod";

export const jobFormSchema = z
  .object({
    title: z.string().min(1, "El título de la convocatoria es obligatorio"),
    area: z.enum([
      "Recursos Humanos",
      "Tesorería",
      "Administración",
      "Tecnologías de Información",
      "Obras",
      "Defensa Civil",
      "Fiscalización",
      "Secretaría General",
    ], {
      errorMap: () => ({ message: "El área responsable es obligatoria" }),
    }),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
    vacancies: z.preprocess(
      (val) => Number(val),
      z.number().int().min(1, "Las vacantes deben ser mayores a cero")
    ),
    experienceYears: z.preprocess(
      (val) => Number(val),
      z.number().int().min(0, "Los años de experiencia deben ser cero o más")
    ),
    academicLevel: z.string().min(1, "El nivel académico mínimo es obligatorio"),
    certifications: z.string().optional(),
    skills: z.string().min(1, "Debe registrar al menos una habilidad requerida"),
    publishedAt: z.string().min(1, "La fecha de publicación es obligatoria"),
    closedAt: z.string().min(1, "La fecha de cierre es obligatoria"),
    status: z.enum(["Borrador", "Activa", "Pausada", "Cerrada", "Finalizada"]),
  })
  .refine(
    (data) => {
      const pub = new Date(data.publishedAt);
      const close = new Date(data.closedAt);
      return close > pub;
    },
    {
      message: "La fecha de cierre debe ser posterior a la fecha de publicación",
      path: ["closedAt"],
    }
  );

export type JobFormData = z.infer<typeof jobFormSchema>;

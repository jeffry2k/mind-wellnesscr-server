import { z } from "zod";

export const createExerciseSchema = z.object({
  body: z.object({
    nombre: z
      .string()
      .nonempty("Nombre es requerido")
      .min(4, "Ejercicio debe contener al menos 4 carácteres"),
    observaciones: z.string().optional(),
    urlVideo: z.string().optional(),
  }),
});

export const updateExerciseSchema = z.object({
  body: z.object({
    nombre: z
      .string()
      .nonempty("Nombre es requerido")
      .min(4, "Ejercicio debe contener al menos 4 carácteres")
      .optional(),
    observaciones: z.string().optional(),
    urlVideo: z.string().optional(),
  }),
  params: z.object({
    id: z.string().min(3),
  }),
});

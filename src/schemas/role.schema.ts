import { z } from "zod";

export const createRoleSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Nombre del rol es requerido").min(4),
    description: z
      .string()
      .nonempty("Descripción del rol es requerida")
      .max(200, "Descripción no debe sobrepasar los 200 caracteres"),
  }),
});

export const updateRoleSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Nombre del rol es requerido").min(4).optional(),
    description: z
      .string()
      .nonempty("Descripción del rol es requerida")
      .max(200, "Descripción no debe sobrepasar los 200 caracteres")
      .optional(),
  }),
  params: z.object({
    id: z.string().min(3),
  }),
});

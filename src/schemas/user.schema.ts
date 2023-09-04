import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Nombre es requerido"),
    email: z.string().email().nonempty("Email es requerido"),
    username: z
      .string()
      .min(4, "Usuario debe contener al menos 6 caractéres")
      .nonempty("Usuario es requerido"),
    password: z
      .string()
      .min(6, "Password debe contener al menos 6 caractéres")
      .nonempty("Password es requerido"),
    status: z.number().nonnegative(),
    phone_number: z.number().nonnegative(),
    roles: z.string().array().nonempty("Rol es requerido"),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Nombre es requerido").optional(),
    email: z.string().email().nonempty("Email es requerido").optional(),
    username: z
      .string()
      .min(4, "Usuario debe contener al menos 6 caractéres")
      .nonempty("Usuario es requerido").optional(),
    password: z
      .string()
      .min(6, "Password debe contener al menos 6 caractéres")
      .nonempty("Password es requerido")
      .optional(),
    status: z.number().nonnegative().optional(),
    phone_number: z.number().nullable().optional(),
    roles: z.string().array().nonempty("Rol es requerido").optional(),
  }),
});

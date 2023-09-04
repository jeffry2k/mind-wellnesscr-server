import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    username: z.string().nonempty("Usuario es requerido").min(6),
    password: z.string().min(6),
  }),
});

import { z } from "zod";

const routineDataSchema = z.object({
  diaEjercicio: z.number().nonnegative("no se permiten números negativos"),
  // idEjercicio: z.string().nonempty("Id del ejercicio es requerido"),
  idEjercicio: z.object({
    nombre: z.string().nonempty("Nombre del ejercicio es requerido"),
    _id: z.string().nonempty("Id del ejercicio es requerido"),
  }),
  ordenEjercicio: z.number().nonnegative("no se permiten números negativos"),
  // nombreEjercicio: z.string().nonempty("Nombre del ejercicio es requerido"),
  obsEjercicio: z.string().optional(),
});

export const createRoutineSchema = z.object({
  body: z.object({
    datosRutina: z
      .array(routineDataSchema)
      .nonempty("Datos de la rutina son requeridos"),
    notas: z.string().optional(),
    metodo: z.string().optional(),
    usuario: z.any(),
  }),
});

export const updateRoutineSchema = z.object({
  body: z.object({
    diaEjercicio: z.number().nonnegative().optional(),
    idEjercicio: z
      .string()
      .nonempty("Id del ejercicio es requerido")
      .optional(),
    obsEjercicio: z.string().optional(),
    ordenEjercicio: z.number().nonnegative().optional(),
    // nombreEjercicio: z
    //   .string()
    //   .nonempty("Nombre del ejercicio es requerido")
    //   .optional(),
    notas: z.string().optional(),
    metodo: z.string().optional(),
    usuario: z.any(),
  }),
  params: z.object({
    id: z.string().min(3),
  }),
});

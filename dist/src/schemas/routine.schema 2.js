"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoutineSchema = exports.createRoutineSchema = void 0;
const zod_1 = require("zod");
const routineDataSchema = zod_1.z.object({
    diaEjercicio: zod_1.z.number().nonnegative("no se permiten números negativos"),
    // idEjercicio: z.string().nonempty("Id del ejercicio es requerido"),
    idEjercicio: zod_1.z.object({
        nombre: zod_1.z.string().nonempty("Nombre del ejercicio es requerido"),
        _id: zod_1.z.string().nonempty("Id del ejercicio es requerido"),
    }),
    ordenEjercicio: zod_1.z.number().nonnegative("no se permiten números negativos"),
    // nombreEjercicio: z.string().nonempty("Nombre del ejercicio es requerido"),
    obsEjercicio: zod_1.z.string().optional(),
});
exports.createRoutineSchema = zod_1.z.object({
    body: zod_1.z.object({
        datosRutina: zod_1.z
            .array(routineDataSchema)
            .nonempty("Datos de la rutina son requeridos"),
        notas: zod_1.z.string().optional(),
        metodo: zod_1.z.string().optional(),
        usuario: zod_1.z.any(),
    }),
});
exports.updateRoutineSchema = zod_1.z.object({
    body: zod_1.z.object({
        diaEjercicio: zod_1.z.number().nonnegative().optional(),
        idEjercicio: zod_1.z
            .string()
            .nonempty("Id del ejercicio es requerido")
            .optional(),
        obsEjercicio: zod_1.z.string().optional(),
        ordenEjercicio: zod_1.z.number().nonnegative().optional(),
        // nombreEjercicio: z
        //   .string()
        //   .nonempty("Nombre del ejercicio es requerido")
        //   .optional(),
        notas: zod_1.z.string().optional(),
        metodo: zod_1.z.string().optional(),
        usuario: zod_1.z.any(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(3),
    }),
});

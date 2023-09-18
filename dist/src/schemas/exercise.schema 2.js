"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExerciseSchema = exports.createExerciseSchema = void 0;
const zod_1 = require("zod");
exports.createExerciseSchema = zod_1.z.object({
    body: zod_1.z.object({
        nombre: zod_1.z
            .string()
            .nonempty("Nombre es requerido")
            .min(4, "Ejercicio debe contener al menos 4 carácteres"),
        observaciones: zod_1.z.string().optional(),
        urlVideo: zod_1.z.string().optional(),
    }),
});
exports.updateExerciseSchema = zod_1.z.object({
    body: zod_1.z.object({
        nombre: zod_1.z
            .string()
            .nonempty("Nombre es requerido")
            .min(4, "Ejercicio debe contener al menos 4 carácteres")
            .optional(),
        observaciones: zod_1.z.string().optional(),
        urlVideo: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(3),
    }),
});

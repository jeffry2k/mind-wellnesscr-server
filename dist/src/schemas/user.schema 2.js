"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Nombre es requerido"),
        email: zod_1.z.string().email().nonempty("Email es requerido"),
        username: zod_1.z
            .string()
            .min(4, "Usuario debe contener al menos 6 caractéres")
            .nonempty("Usuario es requerido"),
        password: zod_1.z
            .string()
            .min(6, "Password debe contener al menos 6 caractéres")
            .nonempty("Password es requerido"),
        status: zod_1.z.number().nonnegative(),
        phone_number: zod_1.z.number().nonnegative(),
        roles: zod_1.z.string().array().nonempty("Rol es requerido"),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Nombre es requerido").optional(),
        email: zod_1.z.string().email().nonempty("Email es requerido").optional(),
        username: zod_1.z
            .string()
            .min(4, "Usuario debe contener al menos 6 caractéres")
            .nonempty("Usuario es requerido").optional(),
        password: zod_1.z
            .string()
            .min(6, "Password debe contener al menos 6 caractéres")
            .nonempty("Password es requerido")
            .optional(),
        status: zod_1.z.number().nonnegative().optional(),
        phone_number: zod_1.z.number().nullable().optional(),
        roles: zod_1.z.string().array().nonempty("Rol es requerido").optional(),
    }),
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleSchema = exports.createRoleSchema = void 0;
const zod_1 = require("zod");
exports.createRoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Nombre del rol es requerido").min(4),
        description: zod_1.z
            .string()
            .nonempty("Descripción del rol es requerida")
            .max(200, "Descripción no debe sobrepasar los 200 caracteres"),
    }),
});
exports.updateRoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Nombre del rol es requerido").min(4).optional(),
        description: zod_1.z
            .string()
            .nonempty("Descripción del rol es requerida")
            .max(200, "Descripción no debe sobrepasar los 200 caracteres")
            .optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(3),
    }),
});

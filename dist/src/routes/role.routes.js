"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authValidator_1 = require("../middlewares/authValidator");
const role_controller_1 = require("../controllers/role.controller");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const role_schema_1 = require("../schemas/role.schema");
const router = (0, express_1.Router)();
router.get("/get", role_controller_1.getRoles);
router.get("/get/:id", authValidator_1.authValidator, role_controller_1.getRole);
router.get("/getByName/:name", role_controller_1.getRoleByName);
router.post("/create", 
// authValidator,
(0, schemaValidator_1.schemaValidator)(role_schema_1.createRoleSchema), role_controller_1.createRole);
router.put("/update/:id", authValidator_1.authValidator, (0, schemaValidator_1.schemaValidator)(role_schema_1.updateRoleSchema), role_controller_1.updateRole);
router.delete("/delete/:id", authValidator_1.authValidator, role_controller_1.deleteRole);
exports.default = router;

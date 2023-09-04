"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routine_controller_1 = require("../controllers/routine.controller");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const authValidator_1 = require("../middlewares/authValidator");
const routine_schema_1 = require("../schemas/routine.schema");
const router = (0, express_1.Router)();
router.get("/get", authValidator_1.authValidator, routine_controller_1.getRoutines);
router.get("/get/:id", authValidator_1.authValidator, routine_controller_1.getRoutine);
router.get("/getUserRoutine/:userId", authValidator_1.authValidator, routine_controller_1.getUserRoutine);
router.post("/create", authValidator_1.authValidator, (0, schemaValidator_1.schemaValidator)(routine_schema_1.createRoutineSchema), routine_controller_1.createRoutine);
router.put("/update/:id", authValidator_1.authValidator, (0, schemaValidator_1.schemaValidator)(routine_schema_1.updateRoutineSchema), routine_controller_1.updateRoutine);
router.delete("/delete/:id", authValidator_1.authValidator, routine_controller_1.deleteRoutine);
exports.default = router;
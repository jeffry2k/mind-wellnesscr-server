"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authValidator_1 = require("../middlewares/authValidator");
const exercise_controller_1 = require("../controllers/exercise.controller");
const exercise_schema_1 = require("../schemas/exercise.schema");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const router = (0, express_1.Router)();
router.get("/get", authValidator_1.authValidator, exercise_controller_1.getExercises);
router.get("/get/:id", authValidator_1.authValidator, exercise_controller_1.getExercise);
router.post("/create", authValidator_1.authValidator, (0, schemaValidator_1.schemaValidator)(exercise_schema_1.createExerciseSchema), exercise_controller_1.createExercise);
router.put("/update/:id", authValidator_1.authValidator, (0, schemaValidator_1.schemaValidator)(exercise_schema_1.updateExerciseSchema), exercise_controller_1.updateExercise);
router.delete("/delete/:id", authValidator_1.authValidator, exercise_controller_1.deleteExercise);
exports.default = router;

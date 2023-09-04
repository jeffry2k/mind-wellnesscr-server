import { Router } from "express";
import { authValidator } from "../middlewares/authValidator";
import { updateExercise, createExercise, deleteExercise, getExercise, getExercises } from "../controllers/exercise.controller";
import { createExerciseSchema, updateExerciseSchema } from "../schemas/exercise.schema";
import { schemaValidator } from "../middlewares/schemaValidator";

const router = Router();

router.get("/get", authValidator, getExercises);
router.get("/get/:id", authValidator, getExercise);
router.post(
  "/create",
  authValidator,
  schemaValidator(createExerciseSchema),
  createExercise
);
router.put(
  "/update/:id",
  authValidator,
  schemaValidator(updateExerciseSchema),
  updateExercise
);
router.delete("/delete/:id", authValidator, deleteExercise);

export default router;
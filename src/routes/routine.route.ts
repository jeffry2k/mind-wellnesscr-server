import { Router } from "express";

import {
  getRoutines,
  getRoutine,
  getUserRoutine,
  createRoutine,
  updateRoutine,
  deleteRoutine,
} from "../controllers/routine.controller";

import { schemaValidator } from "../middlewares/schemaValidator";
import { authValidator } from "../middlewares/authValidator";
import {
  createRoutineSchema,
  updateRoutineSchema,
} from "../schemas/routine.schema";

const router = Router();

router.get("/get", authValidator, getRoutines);
router.get("/get/:id", authValidator, getRoutine);
router.get("/getUserRoutine/:userId", authValidator, getUserRoutine);
router.post(
  "/create",
  authValidator,
  schemaValidator(createRoutineSchema),
  createRoutine
);
router.put(
  "/update/:id",
  authValidator,
  schemaValidator(updateRoutineSchema),
  updateRoutine
);
router.delete("/delete/:id", authValidator, deleteRoutine);

export default router;

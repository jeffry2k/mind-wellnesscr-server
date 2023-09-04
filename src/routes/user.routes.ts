import { Router } from "express";
import { authValidator } from "../middlewares/authValidator";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { checkDuplicatedUsernameOrEmail } from "../middlewares/registerValidator";

const router = Router();

router.get("/get", authValidator, getUsers);
router.get("/get/:id", authValidator, getUser);

router.post(
  "/create",
  schemaValidator(createUserSchema),
  checkDuplicatedUsernameOrEmail,
  createUser
);

router.put(
  "/update/:id",
  authValidator,
  schemaValidator(updateUserSchema),
  updateUser
);
router.delete("/delete/:id", authValidator, deleteUser);

export default router;

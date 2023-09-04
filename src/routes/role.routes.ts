import { Router } from "express";
import { authValidator } from "../middlewares/authValidator";
import {
  createRole,
  deleteRole,
  getRole,
  getRoleByName,
  getRoles,
  updateRole,
} from "../controllers/role.controller";
import { schemaValidator } from "../middlewares/schemaValidator";
import { createRoleSchema, updateRoleSchema } from "../schemas/role.schema";

const router = Router();

router.get("/get", getRoles);
router.get("/get/:id", authValidator, getRole);
router.get("/getByName/:name", getRoleByName);
router.post(
  "/create",
  // authValidator,
  schemaValidator(createRoleSchema),
  createRole
);
router.put(
  "/update/:id",
  authValidator,
  schemaValidator(updateRoleSchema),
  updateRole
);
router.delete("/delete/:id", authValidator, deleteRole);

export default router;

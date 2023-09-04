import { NextFunction, Request, Response, Router } from "express";
import { schemaValidator } from "../middlewares/schemaValidator";
import { loginSchema } from "../schemas/auth.schema";
import { login, logout } from "../controllers/auth.controller";

const router = Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/", (req, res) => {
  res.json({ message: "Bienvenido a MindWellnessCR" });
});

router.post("/login", schemaValidator(loginSchema), login);
router.post("/logout", logout);

export default router;

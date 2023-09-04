import express, { Application } from "express";
import { PORT, FRONTEND_URL } from "../src/config"
import cors from "cors";
import authRoutes from "../src/routes/auth.routes";
import exerciseRoutes from "../src/routes/exercise.route";
import routineRoutes from "../src/routes/routine.route";
import roleRoutes from "../src/routes/role.routes";
import userRoutes from "../src/routes/user.routes";

const app: Application = express();

//settings
app.set("port", PORT || 3000);

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/routine", routineRoutes);

export default app;

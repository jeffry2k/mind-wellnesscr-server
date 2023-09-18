"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../src/config");
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("../src/routes/auth.routes"));
const exercise_route_1 = __importDefault(require("../src/routes/exercise.route"));
const routine_route_1 = __importDefault(require("../src/routes/routine.route"));
const role_routes_1 = __importDefault(require("../src/routes/role.routes"));
const user_routes_1 = __importDefault(require("../src/routes/user.routes"));
const app = (0, express_1.default)();
//settings
app.set("port", config_1.PORT || 3000);
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [config_1.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
}));
//routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/role", role_routes_1.default);
app.use("/api/exercise", exercise_route_1.default);
app.use("/api/routine", routine_route_1.default);
exports.default = app;

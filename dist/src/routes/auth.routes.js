"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schemaValidator_1 = require("../middlewares/schemaValidator");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.get("/", (req, res) => {
    res.json({ message: "Bienvenido a MindWellnessCR" });
});
router.post("/login", (0, schemaValidator_1.schemaValidator)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
exports.default = router;

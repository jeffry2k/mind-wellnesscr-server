"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authValidator = (req, res, next) => {
    const validateHeather = req.headers.authorization;
    if (!validateHeather)
        return res.status(401).json({ message: "No autorizado" });
    const token = validateHeather.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "No autorizado" });
    jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (err, usuario) => {
        if (err)
            return res.status(401).json({ message: "No autorizado" });
        req.user = usuario;
        next();
    });
};
exports.authValidator = authValidator;

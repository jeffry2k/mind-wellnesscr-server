"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const usuario = yield user_model_1.default.findOne({ username }).populate({
            path: "roles",
            select: "name",
        });
        if (!usuario)
            return res.status(404).json({ message: "Usuario no registrado" });
        const claveCorrecta = yield usuario.validatePassword(password);
        if (!claveCorrecta)
            return res.status(404).json({ message: "Clave incorrecta" });
        const token = jsonwebtoken_1.default.sign({
            _id: usuario._id,
            username: usuario.username,
        }, config_1.TOKEN_SECRET, {
            expiresIn: "1d", // Expira en 1 día
        });
        const datosUsuario = {
            id: usuario._id,
            name: usuario.name,
            username: usuario.username,
            email: usuario.email,
            status: usuario.status,
            phone_number: usuario.phone_number,
            roles: usuario.roles,
            tokenAcceso: token,
        };
        res.header("authorization", token).json(datosUsuario);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.login = login;
const logout = (req, res) => {
    res
        .header("authorization", "")
        .json({ message: "Sesión finalizada correctamente" });
};
exports.logout = logout;

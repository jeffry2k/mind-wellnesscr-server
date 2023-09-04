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
exports.checkDuplicatedUsernameOrEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const checkDuplicatedUsernameOrEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = req.body;
        const user = yield user_model_1.default.findOne({ username });
        if (user)
            return res
                .status(400)
                .json({ message: "Nombre de usuario ya está registrado!" });
        const correo = yield user_model_1.default.findOne({ email });
        if (correo)
            return res.status(400).json({
                message: "Correo ya está registrado!",
            });
        next();
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.checkDuplicatedUsernameOrEmail = checkDuplicatedUsernameOrEmail;

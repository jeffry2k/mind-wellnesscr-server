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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find().populate({
            path: "roles",
            select: "name",
        });
        if (users.length <= 0)
            return res
                .status(400)
                .json({ message: "No existen usuarios registrados" });
        res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.params.id });
        if (!user)
            return res.status(400).json({ message: "Usuario no encontrado" });
        res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.default({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
        phone_number: req.body.phone_number,
        roles: req.body.roles,
    });
    try {
        user.password = yield user.encrypPassword(user.password);
        const foundRoles = yield role_model_1.default.find({ _id: { $in: req.body.roles } });
        if (foundRoles.length === 0)
            return res.status(404).json({ message: "El rol ingresado no existe" });
        user.roles = foundRoles.map((role) => role._id);
        const usuarioGuardado = yield user.save();
        if (!usuarioGuardado)
            return res.status(404).json({ message: "Error al registrar usuario!" });
        res.status(200).json({ message: "Usuario registrado satisfactoriamente" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, status, phone_number, roles } = req.body;
        const userFound = yield user_model_1.default.findOne({ _id: req.params.id });
        if (!userFound)
            return res.status(400).json({ message: "Usuario no encontrado" });
        yield user_model_1.default.findByIdAndUpdate(userFound._id, {
            name,
            username,
            email,
            status,
            phone_number,
            roles,
        });
        return res
            .status(200)
            .json({ message: "Usuario actualizado correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield user_model_1.default.findOne({ _id: req.params.id });
        if (!userFound)
            return res.status(400).json({ message: "Usuario no encontrado" });
        yield user_model_1.default.findByIdAndDelete(userFound._id);
        return res
            .status(200)
            .json({ message: "Usuario eliminado correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.deleteUser = deleteUser;

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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleByName = exports.getRole = exports.getRoles = void 0;
const role_model_1 = __importDefault(require("../models/role.model"));
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_model_1.default.find();
        if (roles.length <= 0)
            return res.status(400).json({ message: "No existen Roles" });
        res.status(200).json({ roles });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getRoles = getRoles;
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_model_1.default.findOne({ _id: req.params.id });
        if (!role)
            return res.status(400).json({ message: "No existe rol" });
        res.status(200).json({ role });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getRole = getRole;
const getRoleByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_model_1.default.findOne({ name: req.params.name });
        if (!role)
            return res.status(400).json({ message: "No existe rol" });
        res.status(200).json({ role });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getRoleByName = getRoleByName;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const newRole = new role_model_1.default({
            name,
            description,
        });
        yield newRole.save();
        return res
            .status(200)
            .json({ message: "Rol nuevo agregado correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.createRole = createRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const role = yield role_model_1.default.findOne({ _id: req.params.id });
        if (!role)
            return res.status(400).json({ message: "Rol no encontrado" });
        yield role_model_1.default.findByIdAndUpdate(req.params.id, {
            name,
            description,
        });
        return res.status(200).json({ message: "Rol actualizado correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield role_model_1.default.findByIdAndDelete(req.params.id);
        if (!role)
            return res.status(400).json({ message: "Rol no encontrado" });
        return res.status(200).json({ message: "Rol eliminado correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.deleteRole = deleteRole;

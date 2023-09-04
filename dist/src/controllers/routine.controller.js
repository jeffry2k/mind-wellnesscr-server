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
exports.deleteRoutine = exports.updateRoutine = exports.createRoutine = exports.getUserRoutine = exports.getRoutine = exports.getRoutines = void 0;
const routine_model_1 = __importDefault(require("../models/routine.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getRoutines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routines = yield routine_model_1.default.find().populate({
            path: "datosRutina.idEjercicio",
            select: "nombre urlVideo",
        });
        if (routines.length <= 0)
            return res.status(400).json({ message: "No existen rutinas" });
        res.status(200).json({ routines });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getRoutines = getRoutines;
const getRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routine = yield routine_model_1.default.findOne({ _id: req.params.id }).populate({
            path: "datosRutina.idEjercicio",
            select: "nombre urlVideo",
        });
        if (!routine)
            return res.status(400).json({ message: "No existe rutina" });
        res.status(200).json({ routine });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getRoutine = getRoutine;
const getUserRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield user_model_1.default.findOne({ _id: req.params.userId });
        if (!userFound)
            return res.status(400).json({ message: "Usuario no existe!" });
        const routine = yield routine_model_1.default.find({ usuario: userFound._id }).populate({
            path: "datosRutina.idEjercicio",
            select: "nombre urlVideo",
        });
        if (!routine)
            return res.status(400).json({ message: "No existe rutina" });
        const arr = routine;
        let arrayData = [];
        arr.map((d) => {
            arrayData = d.datosRutina;
        });
        arrayData
            .sort((a, b) => (a.diaEjercicio < b.diaEjercicio ? -1 : 1));
        // .sort((a, b) => (a.ordenEjercicio < b.ordenEjercicio ? -1 : 1));
        res.status(200).json({ routine });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getUserRoutine = getUserRoutine;
const createRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { datosRutina, notas, metodo, usuario } = req.body;
        const userFound = yield user_model_1.default.findOne({ _id: usuario });
        if (!userFound)
            return res.status(400).json({ message: "Usuario no existe!" });
        const routineData = [];
        datosRutina.map((data) => {
            routineData.push(data);
        });
        const newRoutine = new routine_model_1.default({
            datosRutina: routineData,
            notas,
            metodo,
            usuario: userFound._id,
        });
        yield newRoutine.save();
        return res
            .status(200)
            .json({ message: "Rutina nueva agregada correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.createRoutine = createRoutine;
const updateRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routine = yield routine_model_1.default.findOne({ _id: req.params.id });
        if (!routine)
            return res.status(400).json({ message: "Rutina no encontrada" });
        const { datosRutina, notas, metodo, usuario } = req.body;
        // const userFound = await User.findOne({ username: usuario });
        // if (!userFound)
        //   return res.status(400).json({ message: "Usuario no existe!" });
        // const routineData: Array<IRoutineData> = [];
        // datosRutina.map((data: IRoutineData) => {
        //   routineData.push(data);
        // });
        yield routine_model_1.default.findByIdAndUpdate(req.params.id, {
            datosRutina,
            notas,
            metodo,
            usuario,
        });
        return res
            .status(200)
            .json({ message: "Rutina actualizada correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.updateRoutine = updateRoutine;
const deleteRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routine = yield routine_model_1.default.findByIdAndDelete(req.params.id);
        if (!routine)
            return res.status(400).json({ message: "Rutina no encontrada" });
        return res.status(200).json({ message: "Rutina eliminada correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.deleteRoutine = deleteRoutine;

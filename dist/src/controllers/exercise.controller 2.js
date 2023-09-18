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
exports.deleteExercise = exports.updateExercise = exports.createExercise = exports.getExercise = exports.getExercises = void 0;
const exercise_model_1 = __importDefault(require("../models/exercise.model"));
const getExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield exercise_model_1.default.find();
        if (exercises.length <= 0)
            return res.status(400).json({ message: "No existen ejercicios" });
        res.status(200).json({ exercises });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getExercises = getExercises;
const getExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = yield exercise_model_1.default.findOne({ _id: req.params.id });
        if (!exercise)
            return res.status(400).json({ message: "No existe ejercicio" });
        res.status(200).json({ exercise });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getExercise = getExercise;
const createExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, observaciones, urlVideo } = req.body;
        const exercise = yield exercise_model_1.default.findOne({ nombre })
            .collation({ locale: "en", strength: 2 })
            .exec();
        if (exercise)
            return res
                .status(500)
                .json({ message: "Ya existe un ejercicio con el mismo nombre" });
        const newExercise = new exercise_model_1.default({
            nombre,
            observaciones,
            urlVideo,
        });
        yield newExercise.save();
        return res
            .status(200)
            .json({ message: "Ejercicio nuevo agregado correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.createExercise = createExercise;
const updateExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, observaciones, urlVideo } = req.body;
        const exercise = yield exercise_model_1.default.findOne({ _id: req.params.id });
        if (!exercise)
            return res.status(400).json({ message: "Ejercicio no encontrado" });
        yield exercise_model_1.default.findByIdAndUpdate(req.params.id, {
            nombre,
            observaciones,
            urlVideo,
        });
        return res
            .status(200)
            .json({ message: "Ejercicio actualizado correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.updateExercise = updateExercise;
const deleteExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercise = yield exercise_model_1.default.findByIdAndDelete(req.params.id);
        if (!exercise)
            return res.status(400).json({ message: "Ejercicio no encontrado" });
        return res
            .status(200)
            .json({ message: "Ejercicio eliminado correctamente!" });
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.deleteExercise = deleteExercise;

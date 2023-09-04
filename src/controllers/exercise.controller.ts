import { Request, Response } from "express";
import Exercise, { IExercise } from "../models/exercise.model";

export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find();
    if (exercises.length <= 0)
      return res.status(400).json({ message: "No existen ejercicios" });
    res.status(200).json({ exercises });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getExercise = async (req: Request, res: Response) => {
  try {
    const exercise = await Exercise.findOne({ _id: req.params.id });
    if (!exercise)
      return res.status(400).json({ message: "No existe ejercicio" });
    res.status(200).json({ exercise });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  try {
    const { nombre, observaciones, urlVideo } = req.body;
    const exercise = await Exercise.findOne({ nombre })
      .collation({ locale: "en", strength: 2 })
      .exec();
    if (exercise)
      return res
        .status(500)
        .json({ message: "Ya existe un ejercicio con el mismo nombre" });
    const newExercise: IExercise = new Exercise({
      nombre,
      observaciones,
      urlVideo,
    });
    await newExercise.save();
    return res
      .status(200)
      .json({ message: "Ejercicio nuevo agregado correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { nombre, observaciones, urlVideo } = req.body;
    const exercise = await Exercise.findOne({ _id: req.params.id });
    if (!exercise)
      return res.status(400).json({ message: "Ejercicio no encontrado" });
    await Exercise.findByIdAndUpdate(req.params.id, {
      nombre,
      observaciones,
      urlVideo,
    });
    return res
      .status(200)
      .json({ message: "Ejercicio actualizado correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise)
      return res.status(400).json({ message: "Ejercicio no encontrado" });
    return res
      .status(200)
      .json({ message: "Ejercicio eliminado correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

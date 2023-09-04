import { Request, Response } from "express";
import Routine, { IRoutine, IRoutineData } from "../models/routine.model";
import User from "../models/user.model";

export const getRoutines = async (req: Request, res: Response) => {
  try {
    const routines = await Routine.find().populate({
      path: "datosRutina.idEjercicio",
      select: "nombre urlVideo",
    });
    if (routines.length <= 0)
      return res.status(400).json({ message: "No existen rutinas" });
    res.status(200).json({ routines });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getRoutine = async (req: Request, res: Response) => {
  try {
    const routine = await Routine.findOne({ _id: req.params.id }).populate({
      path: "datosRutina.idEjercicio",
      select: "nombre urlVideo",
    });
    if (!routine) return res.status(400).json({ message: "No existe rutina" });
    res.status(200).json({ routine });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getUserRoutine = async (req: Request, res: Response) => {
  try {
    const userFound = await User.findOne({ _id: req.params.userId });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no existe!" });
    const routine = await Routine.find({ usuario: userFound._id }).populate({
      path: "datosRutina.idEjercicio",
      select: "nombre urlVideo",
    });
    if (!routine) return res.status(400).json({ message: "No existe rutina" });
    const arr: IRoutine[] = routine;
    let arrayData: IRoutineData[] = [];
    arr.map((d) => {
      arrayData = d.datosRutina;
    });
    arrayData
      .sort((a, b) => (a.diaEjercicio < b.diaEjercicio ? -1 : 1))
      // .sort((a, b) => (a.ordenEjercicio < b.ordenEjercicio ? -1 : 1));
    res.status(200).json({ routine });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createRoutine = async (req: Request, res: Response) => {
  try {
    const { datosRutina, notas, metodo, usuario } = req.body;
    const userFound = await User.findOne({ _id: usuario });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no existe!" });
    const routineData: Array<IRoutineData> = [];
    datosRutina.map((data: IRoutineData) => {
      routineData.push(data);
    });
    const newRoutine: IRoutine = new Routine({
      datosRutina: routineData,
      notas,
      metodo,
      usuario: userFound._id,
    });

    await newRoutine.save();
    return res
      .status(200)
      .json({ message: "Rutina nueva agregada correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateRoutine = async (req: Request, res: Response) => {
  try {
    const routine = await Routine.findOne({ _id: req.params.id });
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
    await Routine.findByIdAndUpdate(req.params.id, {
      datosRutina,
      notas,
      metodo,
      usuario,
    });
    return res
      .status(200)
      .json({ message: "Rutina actualizada correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteRoutine = async (req: Request, res: Response) => {
  try {
    const routine = await Routine.findByIdAndDelete(req.params.id);
    if (!routine)
      return res.status(400).json({ message: "Rutina no encontrada" });
    return res.status(200).json({ message: "Rutina eliminada correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

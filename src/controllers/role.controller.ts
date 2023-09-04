import { Request, Response } from "express";
import Role, { IRole } from "../models/role.model";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find();
    if (roles.length <= 0)
      return res.status(400).json({ message: "No existen Roles" });
    res.status(200).json({ roles });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.findOne({ _id: req.params.id });
    if (!role) return res.status(400).json({ message: "No existe rol" });
    res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getRoleByName = async (req: Request, res: Response) => {
  try {
    const role = await Role.findOne({ name: req.params.name });
    if (!role) return res.status(400).json({ message: "No existe rol" });
    res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newRole: IRole = new Role({
      name,
      description,
    });
    await newRole.save();
    return res
      .status(200)
      .json({ message: "Rol nuevo agregado correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const role = await Role.findOne({ _id: req.params.id });
    if (!role) return res.status(400).json({ message: "Rol no encontrado" });
    await Role.findByIdAndUpdate(req.params.id, {
      name,
      description,
    });
    return res.status(200).json({ message: "Rol actualizado correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(400).json({ message: "Rol no encontrado" });
    return res.status(200).json({ message: "Rol eliminado correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

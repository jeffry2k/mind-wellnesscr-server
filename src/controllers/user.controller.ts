import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import Role from "../models/role.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate({
      path: "roles",
      select: "name",
    });
    if (users.length <= 0)
      return res
        .status(400)
        .json({ message: "No existen usuarios registrados" });
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });
    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const user: IUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
    phone_number: req.body.phone_number,
    roles: req.body.roles,
  });
  try {
    user.password = await user.encrypPassword(user.password);
    const foundRoles = await Role.find({ _id: { $in: req.body.roles } });
    if (foundRoles.length === 0)
      return res.status(404).json({ message: "El rol ingresado no existe" });
    user.roles = foundRoles.map((role) => role._id);
    const usuarioGuardado = await user.save();
    if (!usuarioGuardado)
      return res.status(404).json({ message: "Error al registrar usuario!" });
    res.status(200).json({ message: "Usuario registrado satisfactoriamente" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, username, email, status, phone_number, roles } = req.body;
    const userFound = await User.findOne({ _id: req.params.id });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    await User.findByIdAndUpdate(userFound._id, {
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
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userFound = await User.findOne({ _id: req.params.id });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    await User.findByIdAndDelete(userFound._id);
    return res
      .status(200)
      .json({ message: "Usuario eliminado correctamente!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

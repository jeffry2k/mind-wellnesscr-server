import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const checkDuplicatedUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ message: "Nombre de usuario ya está registrado!" });
    const correo = await User.findOne({ email });
    if (correo)
      return res.status(400).json({
        message: "Correo ya está registrado!",
      });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

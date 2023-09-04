import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const usuario = await User.findOne({ username }).populate({
      path: "roles",
      select: "name",
    });
    if (!usuario)
      return res.status(404).json({ message: "Usuario no registrado" });
    const claveCorrecta: boolean = await usuario.validatePassword(password);
    if (!claveCorrecta)
      return res.status(404).json({ message: "Clave incorrecta" });
    const token = jwt.sign(
      {
        _id: usuario._id,
        username: usuario.username,
      },
      TOKEN_SECRET,
      {
        expiresIn: "1d", // Expira en 1 día
      }
    );
    const datosUsuario = {
      id: usuario._id,
      name: usuario.name,
      username: usuario.username,
      email: usuario.email,
      status: usuario.status,
      phone_number: usuario.phone_number,
      roles: usuario.roles,
      tokenAcceso: token,
    };
    res.header("authorization", token).json(datosUsuario);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const logout = (req: Request, res: Response) => {
  res
    .header("authorization", "")
    .json({ message: "Sesión finalizada correctamente" });
};

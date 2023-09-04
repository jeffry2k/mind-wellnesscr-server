import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const authValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateHeather = req.headers.authorization;
  if (!validateHeather)
    return res.status(401).json({ message: "No autorizado" });
  const token = validateHeather.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No autorizado" });
  jwt.verify(token, TOKEN_SECRET, (err, usuario) => {
    if (err) return res.status(401).json({ message: "No autorizado" });
    req.user = usuario;
    next();
  });
};

import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { Request, Response, NextFunction } from "express";
import { validateJWT } from "../utils/JWT";

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new HTTPErrorMessage(401, 'Token não encontrado')
  }
  const payload = validateJWT(token);
  return res.status(418).json(payload);
  return next();
}

export default validateToken;
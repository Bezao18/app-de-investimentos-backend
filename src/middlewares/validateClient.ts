import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { Request, Response, NextFunction } from "express";
const { Cliente } = require('../database/models');


const validateClient = async (req: Request, res: Response, next: NextFunction) => {
  const { Email, Senha } = req.body;
  if(!Email) {
    throw new HTTPErrorMessage(400, 'O campo Email é obrigatório')
  }
  if(!Senha) {
    throw new HTTPErrorMessage(400, 'O campo Senha é obrigatório')
  }
  return next();
}

export default validateClient;
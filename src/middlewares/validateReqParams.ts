import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { Request, Response, NextFunction } from "express";

export const validateCodCliente = async (req: Request, res: Response, next: NextFunction) => {
  const { CodCliente } = req.params;
  if(!Number(CodCliente)) {
    throw new HTTPErrorMessage(404, 'Essa rota está incorreta')
  }
  return next();
}

export const validateCodAtivo = async (req: Request, res: Response, next: NextFunction) => {
  const { CodAtivo } = req.params;
  if(!Number(CodAtivo)) {
    throw new HTTPErrorMessage(404, 'Essa rota está incorreta')
  }
  return next();
}


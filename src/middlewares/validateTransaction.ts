import { ITransaction } from '../interfaces'
import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { Request, Response, NextFunction } from "express";


const validateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const { CodCliente, Valor }: ITransaction = req.body;
  if (!CodCliente) {
    throw new HTTPErrorMessage(400, 'O campo CodCliente é obrigatório')
  } if (!Valor && Valor !== 0) {
    throw new HTTPErrorMessage(400, 'O campo Valor é obrigatório')
  }
  return next();
}

export default validateTransaction;
import { IOrder } from '../interfaces'
import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { Request, Response, NextFunction } from "express";


const validateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { CodCliente, CodAtivo, QtdeAtivo }: IOrder = req.body;
  if (!CodCliente) {
    throw new HTTPErrorMessage(400, 'O campo CodCliente é obrigatório')
  } if (!CodAtivo) {
    throw new HTTPErrorMessage(400, 'O campo CodAtivo é obrigatório')
  } if (!QtdeAtivo && QtdeAtivo !== 0) {
    throw new HTTPErrorMessage(400, 'O campo QtdeAtivo é obrigatório')
  } 
  return next();
}

export default validateOrder;
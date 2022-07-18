import { Request, Response } from "express";
import { getClientInfo, withdrawRequest, depositRequest } from '../services/conta.service';

export const getClientAccount = async (req: Request, res: Response) => {
  const { CodCliente } = req.params;
  const clientAccount = await getClientInfo(Number(CodCliente));
  return res.status(200).json(clientAccount);
}

export const withdrawFromAccount = async (req: Request, res: Response) => {
  const transactionInfo = req.body;
  const response = await withdrawRequest(transactionInfo);
  return res.status(200).json(response);
}

export const depositIntoAccount = async (req: Request, res: Response) => {
  const transactionInfo = req.body;
  const response = await depositRequest(transactionInfo);
  return res.status(200).json(response);
}

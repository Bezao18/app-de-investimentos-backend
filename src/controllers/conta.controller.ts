import { Request, Response } from "express";
import {IClient, ITransaction} from '../interfaces'
import { getClientInfo, withdrawRequest, depositRequest } from '../services/conta.service';

export const getClientAccount = async (req: Request, res: Response) => {
  const { CodCliente } = req.params;
  const clientAccount: IClient = await getClientInfo(Number(CodCliente));
  return res.status(200).json(clientAccount);
}

export const withdrawFromAccount = async (req: Request, res: Response) => {
  const transactionInfo: ITransaction = req.body;
  const response:string = await withdrawRequest(transactionInfo);
  return res.status(200).json(response);
}

export const depositIntoAccount = async (req: Request, res: Response) => {
  const transactionInfo: ITransaction = req.body;
  const response: string = await depositRequest(transactionInfo);
  return res.status(200).json(response);
}

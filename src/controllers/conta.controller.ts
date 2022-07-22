import { Request, Response } from "express";
import {IClient, IOrder, ITransaction} from '../interfaces'
import { getClientInfo, withdrawRequest, depositRequest, getOrders, getTransactions } from '../services/conta.service';

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

export const getOrdersHistory = async (req: Request, res: Response) => {
  const { CodCliente } = req.params;
  const response: IOrder[] = await getOrders(Number(CodCliente));
  return res.status(200).json(response);
}

export const getTransactionsHistory = async (req: Request, res: Response) => {
  const { CodCliente } = req.params;
  const response: ITransaction[] = await getTransactions(Number(CodCliente));
  return res.status(200).json(response);
}
import { Request, Response } from "express";
import { getClientInfo } from '../services/conta.service';

export const getClientAccount = async (req: Request, res: Response) => {
  const { CodCliente } = req.params;
  const clientAccount = await getClientInfo(Number(CodCliente));
  return res.status(200).json(clientAccount);
}

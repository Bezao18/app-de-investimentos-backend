import { Request, Response } from "express";
import { newBuyOrder, newSellOrder } from "../services/investimentos.service";

export const sendBuyOrder = async (req: Request, res: Response) => {
  const clientAccount = await newBuyOrder(req.body);
  return res.status(200).json(clientAccount);
}

export const sendSellOrder = async (req: Request, res: Response) => {
  const clientAccount = await newSellOrder(req.body);
  return res.status(200).json(clientAccount);
}
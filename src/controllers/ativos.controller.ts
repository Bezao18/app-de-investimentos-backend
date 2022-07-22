import { Request, Response } from "express";
import { getAll, getAsset, getClientPortfolio } from '../services/ativos.service';
import HTTPErrorMessage from "../utils/HTTPErrorMessage";

export const getAssets = async (req: Request, res: Response) => {
  const { CodAtivo } = req.params;
  if (CodAtivo) {
    const asset = await getAsset(Number(CodAtivo));
    return res.status(200).json(asset)
  } const assets = await getAll();
  return res.status(200).json(assets)
}

export const getAssetsByClient = async (req: Request, res: Response) => {
 const { CodCliente } = req.params;
  if (!CodCliente) {
    throw new HTTPErrorMessage(404,'Esse cliente não existe')
  } 
  const clientPortfolio = await getClientPortfolio(Number(CodCliente)); 
  return res.status(200).json(clientPortfolio)
}
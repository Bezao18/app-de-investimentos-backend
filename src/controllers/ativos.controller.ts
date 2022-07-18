import { Request, Response } from "express";
import { /* getByAsset, getAll, */ getClientPortfolio } from '../services/ativos.service';

const getByParameter = async (req: Request, res: Response) => {
  const { cliente, ativo } = req.query;
  if (cliente) {
    const clientPortfolio = await getClientPortfolio(Number(cliente));
    return res.status(200).json(clientPortfolio)
  } /* if (ativo) {
    const object = await getByAsset(ativo).;
    return res.status(418).json('PESQUISA POR ATIVO')
  }     const object = await getAll();
  return res.status(418).json('PESQUISA GERAL') */
}

export default { getByParameter };
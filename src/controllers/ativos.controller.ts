import { Request, Response } from "express";
import { getByAsset, getAll, getByClient } from '../services/ativos.service';

const getByParameter = async (req: Request, res: Response) => {
  const { cliente, ativo } = req.query;
  if (cliente) {
    const object = await getByClient(cliente);
    return res.status(418).json('PESQUISA POR CLIENTE')
  } if (ativo) {
    const object = await getByAsset(ativo);
    return res.status(418).json('PESQUISA POR ATIVO')
  }     const object = await getAll();
  return res.status(418).json('PESQUISA GERAL')
}

export default { getByParameter };
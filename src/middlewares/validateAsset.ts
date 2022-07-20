import { ITransaction } from '../interfaces'
import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { Request, Response, NextFunction } from "express";
const { Ativo } = require('../database/models');


const validateAsset = async (req: Request, res: Response, next: NextFunction) => {
  const { CodAtivo } = req.body;
  const ativo = await Ativo.findByPk(CodAtivo, { attributes: ['CodAtivo'] });
  if(!ativo) {
    throw new HTTPErrorMessage(404, 'Esse ativo não existe')
  }
  return next();
}

export default validateAsset;
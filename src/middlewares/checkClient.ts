import { ITransaction } from '../interfaces'
import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { Request, Response, NextFunction } from "express";
const { Cliente } = require('../database/models');


const checkClient = async (req: Request, res: Response, next: NextFunction) => {
  const { CodCliente } = req.body;
  const cliente = await Cliente.findByPk(CodCliente, { attributes: ['CodCliente'] });
  if(!cliente) {
    throw new HTTPErrorMessage(404, 'Esse cliente não existe')
  }
  return next();
}

export default checkClient
;
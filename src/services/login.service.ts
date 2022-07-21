import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { createToken } from "../utils/JWT";
const { Cliente } = require('../database/models');
import bcrypt from 'bcrypt-nodejs';
import { IClient } from "../interfaces";

const clientLogin = async (request: IClient): Promise<string> => {
  const client = await Cliente.findOne({ where: { Email: request.Email } })
  if (!client) {
    throw new HTTPErrorMessage(400, 'Dados inválidos')
  } 
  const passwordIsValid = bcrypt.compareSync(request.Senha as string, client.Senha)
  if(!passwordIsValid) {
    throw new HTTPErrorMessage(400, 'Dados inválidos')
  }
  const token = createToken(request)
  return token as string;
}

export default clientLogin;
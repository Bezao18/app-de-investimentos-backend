import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { createToken } from "../utils/JWT";
const { Cliente } = require('../database/models');
import bcrypt from 'bcrypt-nodejs';
import { IClient } from "../interfaces";

const clientLogin = async (clientRequest: IClient): Promise<string> => {
  const client = await Cliente.findOne({ where: { Email: clientRequest.Email } })
  if (!client) {
    throw new HTTPErrorMessage(400, 'Dados inválidos')
  } 
  const passwordIsValid = bcrypt.compareSync(clientRequest.Senha as string, client.Senha)
  if(!passwordIsValid) {
    throw new HTTPErrorMessage(400, 'Dados inválidos')
  }
  const token = createToken(clientRequest)
  return token as string;
}

export default clientLogin;
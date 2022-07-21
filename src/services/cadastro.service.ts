import { IClient } from "../interfaces"
const { Cliente } = require('../database/models');
import bcrypt from 'bcrypt-nodejs';
import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { createToken } from "../utils/JWT";

const createClient = async (client: IClient): Promise<any> => {
  const clientExists = await Cliente.findOne({ where: { Email: client.Email } })
  const emailRegex = /.+@.+.com$/gm;
  const emailIsValid = emailRegex.test(client.Email as string);
  if (String(client.Senha).length < 6) {
    throw new HTTPErrorMessage(400, 'O campo Senha precisa ter pelo menos 6 caracteres')
  } if (!emailIsValid) {
    throw new HTTPErrorMessage(400, 'Email inválido')
  } if (clientExists) {
    throw new HTTPErrorMessage(409, 'Já existe um cliente com esse Email')
  }
  const salt = bcrypt.genSaltSync(5);
  const Senha = bcrypt.hashSync(client.Senha as string, salt);
  Cliente.create({ Email: client.Email, Senha, Saldo: 0 })
  const token = { token: createToken(client) }
  return token
}

export default createClient
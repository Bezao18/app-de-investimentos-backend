import { IClient } from "../interfaces"
const { Cliente } = require('../database/models');
import bcrypt from 'bcrypt-nodejs';
import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { createToken } from "../utils/JWT";

const createClient = (client: IClient): any => {
  const clientExists = Cliente.findAll({ where: { Email: client.Email } })
  if (!clientExists) {
    const salt = bcrypt.genSaltSync(5);
    const Senha = bcrypt.hashSync(client.Senha as string, salt);
    Cliente.create({ Email: client.Email, Senha })
    const token = {token: createToken(client)}
    return token
  }
  throw new HTTPErrorMessage(409, 'Já existe um cliente com esse Email')
}

export default createClient
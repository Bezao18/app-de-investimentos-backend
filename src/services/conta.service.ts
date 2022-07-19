import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import {ITransaction} from '../interfaces'

const { Cliente } = require('../database/models')

export const getClientInfo = async (clientId: number) => {
  const clientInfo = await Cliente.findByPk(clientId);
  if(!clientInfo) {
    throw new HTTPErrorMessage(404, 'Esse cliente não existe')
  }
  return clientInfo;
}

export const withdrawRequest = async (transactionInfo: ITransaction): Promise<string> => {
  const { CodCliente, Valor } = transactionInfo;
  if (Valor <= 0) {
    throw new HTTPErrorMessage(400, `Não é possível sacar um valor negativo ou igual a zero`)
  }
  const { Saldo } = await Cliente.findByPk(CodCliente, { attributes: ['Saldo'] });
  if (Valor > Saldo) {
    throw new HTTPErrorMessage(400, `Saldo insuficiente para sacar R$${Valor}`)
  }
  Cliente.decrement({ Saldo: Valor }, { where: { CodCliente } })
  return `Saque de R$${Valor} feito com sucesso`
}

export const depositRequest = (transactionInfo: ITransaction): string => {
  const { CodCliente, Valor } = transactionInfo;
  if (Valor <= 0) {
    throw new HTTPErrorMessage(400, `Não é possível depositar um valor negativo ou igual a zero`)
  }
  Cliente.increment({ Saldo: Valor }, { where: { CodCliente } })
  return `Depósito de R$${Valor} feito com sucesso`
}
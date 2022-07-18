import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import {ITransaction} from '../interfaces'

const { Cliente } = require('../database/models')

export const getClientInfo = (clientId: number) => {
  const clientInfo = Cliente.findByPk(clientId);
  return clientInfo;
}

export const withdrawRequest = async (transactionInfo: ITransaction): Promise<string> => {
  const { CodCliente, Valor } = transactionInfo;
  const { Saldo } = await Cliente.findByPk(Number(CodCliente), { attributes: ['Saldo'] });
  if (Number(Valor) > Saldo) {
    throw new HTTPErrorMessage(400, `Saldo insuficiente para sacar R$${Valor}`)
  }
  if (Number(Valor) <= 0) {
    throw new HTTPErrorMessage(400, `Não é possível sacar um valor negativo ou igual a zero`)
  }
  Cliente.decrement({ Saldo: Valor }, { where: { CodCliente } })
  return `Saque de R$${Valor} feito com sucesso`
}

export const depositRequest = (transactionInfo: ITransaction): string => {
  const { CodCliente, Valor } = transactionInfo;
  if (Number(Valor) <= 0) {
    throw new HTTPErrorMessage(400, `Não é possível depositar um valor negativo ou igual a zero`)
  }
  Cliente.increment({ Saldo: Valor }, { where: { CodCliente } })
  return `Depósito de R$${Valor} feito com sucesso`
}
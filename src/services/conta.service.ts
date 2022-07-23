import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import getClientsOrder from '../utils/getClientsOrders';
import { IOrder, ITransaction } from '../interfaces'
const { Cliente, Ordem, Transacao } = require('../database/models')

export const getClientInfo = async (clientId: number) => {
  const clientInfo = await Cliente.findByPk(clientId, { attributes: { exclude: ['Senha'] } });
  if (!clientInfo) {
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
  Transacao.create({ CodCliente, Valor, Tipo: 'Saque' })
  return `Saque de R$${Valor} feito com sucesso`
}

export const depositRequest = (transactionInfo: ITransaction): string => {
  const { CodCliente, Valor } = transactionInfo;
  if (Valor <= 0) {
    throw new HTTPErrorMessage(400, `Não é possível depositar um valor negativo ou igual a zero`)
  }
  Cliente.increment({ Saldo: Valor }, { where: { CodCliente } })
  Transacao.create({ CodCliente, Valor, Tipo: 'Depósito' })
  return `Depósito de R$${Valor} feito com sucesso`
}


export const getOrders = async (clientId: number) => {
  const client = await Cliente.findByPk(clientId, { attributes: ['CodCliente'] })
  if (!client) {
    throw new HTTPErrorMessage(404, 'Esse cliente não existe')
  }
  const orders: IOrder[] = await Ordem.findAll({ where: { CodCliente: clientId } })
  if (!orders[0]) {
    throw new HTTPErrorMessage(404, 'Esse cliente não realizou nenhuma ordem')
  }
  return orders;
}

export const getTransactions = async (clientId: number) => {
  const client = await Cliente.findByPk(clientId, { attributes: ['CodCliente'] })
  if (!client) {
    throw new HTTPErrorMessage(404, 'Esse cliente não existe')
  }
  const transactions: ITransaction[] = await Transacao.findAll({ where: { CodCliente: clientId } })
  if (!transactions[0]) {
    throw new HTTPErrorMessage(404, "Esse cliente não realizou nenhuma transação")
  }
  return transactions;
}
import HTTPErrorMessage from "../utils/HTTPErrorMessage";

const { Cliente } = require('../database/models')

export const getClientInfo = (clientId: number) => {
  const clientInfo = Cliente.findByPk(clientId);
  return clientInfo;
}

export const withdrawRequest = async (transactionInfo:any) => {
  const {CodCliente, Valor} = transactionInfo;
  const {Saldo} = await Cliente.findByPk(Number(CodCliente) , {attributes:['Saldo']});
  if(Number(Valor) > Saldo) {
    throw new HTTPErrorMessage(400, `Saldo insuficiente para sacar R$${Valor}`)
  }
  if(Number(Valor) < 0) {
    throw new HTTPErrorMessage(400, `Não é possível sacar um valor negativo`)
  }
  const SaldoAtual = Saldo - Number(Valor)
  await Cliente.update({Saldo: SaldoAtual}, {where:{CodCliente}})
  return `Saque de R$${Valor} feito com sucesso`
}
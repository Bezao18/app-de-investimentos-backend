const { Cliente } = require('../database/models')

export const getClientInfo = (clientId: number) => {
  const clientInfo = Cliente.findByPk(clientId);
  return clientInfo;
}

export const withdrawRequest = async (transactionInfo:any) => {
  const {CodCliente, Valor} = transactionInfo;
  const {Saldo} = await Cliente.findByPk(Number(CodCliente) , {attributes:['Saldo']});
  if(Number(Valor) > Saldo) {
    return {message: `Saldo insuficiente para sacar R$${Valor}`}
  }
  const SaldoAtual = Saldo - Number(Valor)
  await Cliente.update({Saldo: SaldoAtual}, {where:{CodCliente}})
  return `Saque de R$${Valor} feito com sucesso`
}
import { IOrder } from "../interfaces"
import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { getClientPortfolio } from "./ativos.service";
const { Ativo, Cliente, Ordem } = require('../database/models');

export const newBuyOrder = async (buyOrder: IOrder) => {
  const { CodCliente, CodAtivo, QtdeAtivo }: IOrder = buyOrder;
  const asset = await Ativo.findByPk(CodAtivo, { attributes: ['Valor', 'QtdeAtivo'] })
  const { Saldo } = await Cliente.findByPk(CodCliente, { attributes: ['Saldo'] })
  if (Saldo < (asset.Valor * QtdeAtivo)) {
    throw new HTTPErrorMessage(400, 'Saldo insuficiente para essa operação')
  } if (asset.QtdeAtivo < QtdeAtivo) {
    throw new HTTPErrorMessage(400, 'Quantidade de ativos indisponível')
  }
  Ordem.create({ CodCliente, CodAtivo, ValorPago: asset.Valor, QtdeAtivo, Tipo: 'Compra' })
  Ativo.decrement({QtdeAtivo}, {where: CodAtivo})
  Cliente.decrement({ Saldo: (asset.Valor * QtdeAtivo) }, { where: { CodCliente } })
  return 'Ordem de compra executada com sucesso'
}

export const newSellOrder = async (sellOrder: IOrder) => {
  const { CodCliente, CodAtivo, QtdeAtivo }: IOrder = sellOrder;
  const asset = await Ativo.findByPk(CodAtivo, { attributes: ['Valor', 'QtdeAtivo'] })
  const client = await getClientPortfolio(CodCliente)
  if(client.QtdeAtivo < QtdeAtivo) {
    throw new HTTPErrorMessage(400, 'Ativos suficientes para essa operação')
  }
  Ordem.create({ CodCliente, CodAtivo, ValorPago: asset.Valor, QtdeAtivo, Tipo: 'Venda' })
  Ativo.increment({QtdeAtivo}, {where: CodAtivo})
  Cliente.increment({ Saldo: (asset.Valor * QtdeAtivo) }, { where: { CodCliente } })
  return 'Ordem de venda executada com sucesso'
}
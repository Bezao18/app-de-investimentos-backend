import { IAtivo, IOrder } from "../interfaces"
import HTTPErrorMessage from "../utils/HTTPErrorMessage";
import { getClientPortfolio } from "./ativos.service";
const { Ativo, Cliente, Ordem } = require('../database/models');

export const newBuyOrder = async (buyOrder: IOrder) => {
  const { CodCliente, CodAtivo, QtdeAtivo }: IOrder = buyOrder;
  if (QtdeAtivo <= 0) {
    throw new HTTPErrorMessage(400, 'Não é possivel comprar uma quantidade negativa ou igual a zero')
  }
  const asset = await Ativo.findByPk(CodAtivo, { attributes: ['Valor', 'QtdeAtivo'] })
  const { Saldo } = await Cliente.findByPk(CodCliente, { attributes: ['Saldo'] })
  if (asset.QtdeAtivo < QtdeAtivo) {
    throw new HTTPErrorMessage(400, 'Quantidade de ativos indisponível')
  } if (Saldo < (asset.Valor * QtdeAtivo)) {
    throw new HTTPErrorMessage(400, 'Saldo insuficiente para essa operação')
  }
  Ordem.create({ CodCliente, CodAtivo, ValorPago: asset.Valor, QtdeAtivo, Tipo: 'Compra' })
  Ativo.decrement({ QtdeAtivo }, { where: { CodAtivo } })
  Cliente.decrement({ Saldo: (asset.Valor * QtdeAtivo) }, { where: { CodCliente } })
  return 'Ordem de compra executada com sucesso'
}

export const newSellOrder = async (sellOrder: IOrder) => {
  const { CodCliente, CodAtivo, QtdeAtivo }: IOrder = sellOrder;
  if (QtdeAtivo <= 0) {
    throw new HTTPErrorMessage(400, 'Não é possivel vender uma quantidade negativa ou igual a zero')
  }
  const asset = await Ativo.findByPk(CodAtivo, { attributes: ['Valor', 'QtdeAtivo'] })
  const portfolio = await getClientPortfolio(CodCliente)
  const selectedAsset = portfolio.find((asset: IAtivo) => asset.CodAtivo === CodAtivo)
  if (!selectedAsset || selectedAsset.QtdeAtivo < QtdeAtivo) {
    throw new HTTPErrorMessage(400, 'Ativos suficientes para essa operação')
  }
  Ordem.create({ CodCliente, CodAtivo, ValorPago: asset.Valor, QtdeAtivo, Tipo: 'Venda' })
  Ativo.increment({ QtdeAtivo }, { where: { CodAtivo } })
  Cliente.increment({ Saldo: (asset.Valor * QtdeAtivo) }, { where: { CodCliente } })
  return 'Ordem de venda executada com sucesso'
}
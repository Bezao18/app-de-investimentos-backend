import { IOrder } from "../interfaces"
const { Ativo, Cliente, Ordem } = require('../database/models');

export const newBuyOrder = async (buyOrder: IOrder) => {
  const { CodCliente, CodAtivo, QtdeAtivo }: IOrder = buyOrder;
  const asset = await Ativo.findByPk(CodAtivo, { attributes: ['Valor', 'QtdeAtivo'] })
  Ordem.create({ CodCliente, CodAtivo, ValorPago: asset.Valor, QtdeAtivo, Tipo: 'Compra' })
}

export const newSellOrder = async (sellOrder: IOrder) => {
  const { CodCliente, CodAtivo, QtdeAtivo }: IOrder = sellOrder;
  const asset = await Ativo.findByPk(CodAtivo, { attributes: ['Valor', 'QtdeAtivo'] })
  Ordem.create({ CodCliente, CodAtivo, ValorPago: asset.Valor, QtdeAtivo, Tipo: 'Venda' })}
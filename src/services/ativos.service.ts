import { IAtivo, IOrder, IPortfolio } from '../interfaces'
const { Ativo, Cliente } = require('../database/models');
import getClientsOrders from '../utils/getClientsOrders';
import HTTPErrorMessage from '../utils/HTTPErrorMessage';

const getClientPortfolio = async (clientId: number): Promise<any> => {
  const client: Promise<any> = await Cliente.findByPk(clientId, { attributes: ['CodCliente'] })
  if (!client) {
    throw new HTTPErrorMessage(404, 'Esse cliente não existe')
  }
  const buyOrders: IOrder[] = await getClientsOrders(clientId, 'Compra');
  const sellOrders: IOrder[] = await getClientsOrders(clientId, 'Venda');

  const clientPortfolio = buyOrders.map((compra: IOrder, i: number) => {
    const venda: IOrder = sellOrders[i]
    const { CodCliente, CodAtivo, Ativo: { Valor } } = compra
    if (venda) {
      const QtdeAtivo = compra.QtdeAtivo - venda.QtdeAtivo
      const portfolio: IPortfolio = {
        CodCliente,
        CodAtivo,
        QtdeAtivo,
        Valor
      }
      return portfolio
    }
    const portfolio: IPortfolio = {
      CodCliente,
      CodAtivo,
      QtdeAtivo: compra.QtdeAtivo,
      Valor
    }

    return portfolio
  }
  )
  return clientPortfolio;
}

const getAsset = async (assetId: number): Promise<IAtivo> => {
  const asset: Promise<IAtivo> = await Ativo.findByPk(assetId)
  if (!asset) {
    throw new HTTPErrorMessage(404, 'Esse ativo não existe')
  }
  return asset;
}

const getAll = (): Promise<IAtivo>[] => {
  const asset: Promise<IAtivo>[] = Ativo.findAll()
  return asset;
}

export { getAll, getAsset, getClientPortfolio }
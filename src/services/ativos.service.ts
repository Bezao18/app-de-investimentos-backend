import { IAtivo, IOrder, IPortfolio } from '../interfaces'
import calculateClientPortfolio from '../utils/calculateClientPortfolio';
const { Ativo, Cliente } = require('../database/models');
import getClientsOrders from '../utils/getClientsOrders';
import HTTPErrorMessage from '../utils/HTTPErrorMessage';

const getClientPortfolio = async (clientId: number): Promise<IPortfolio[]> => {
  const client = await Cliente.findByPk(clientId, { attributes: ['CodCliente'] });
  if(!client) {
    throw new HTTPErrorMessage(404, 'Esse cliente não existe')
  }
  const buyOrders: IOrder[] = await getClientsOrders(clientId, 'Compra');
  const sellOrders: IOrder[] = await getClientsOrders(clientId, 'Venda');
  if (!buyOrders) {
    throw new HTTPErrorMessage(404, 'O cliente não possui nenhum ativo')
  }
  const clientPortfolio = calculateClientPortfolio({buyOrders, sellOrders})
  return clientPortfolio as IPortfolio[];
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
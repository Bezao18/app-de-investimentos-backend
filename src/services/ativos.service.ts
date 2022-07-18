import sequelize from 'sequelize';
import IClient from '../interfaces/IClient'
const { Ativo } = require('../database/models');
import IOrder from '../interfaces/IOrder';
import getClientsOrders from '../utils/getClientsOrders';

const getClientPortfolio = async (clientId: number): Promise<any> => {
  const buyOrders: IOrder[] = await getClientsOrders(clientId, 'Compra');
  const sellOrders: IOrder[] = await getClientsOrders(clientId, 'Venda');

  const clientPortfolio = buyOrders.map((compra: any, i: number) => {
    const venda = sellOrders[i]
    const { CodCliente, CodAtivo, Ativo: { Valor } } = compra
    if (venda) {
      const QtdeAtivo = compra.QtdeAtivo - venda.QtdeAtivo
      const object = {
        CodCliente,
        CodAtivo,
        QtdeAtivo,
        Valor
      }
      return object
    }
    const object = {
      CodCliente,
      CodAtivo,
      QtdeAtivo: compra.QtdeAtivo,
      Valor
    }
    return object
  }
  )

  return clientPortfolio;
}





const getAsset = async (assetId: number) => {
  const asset = await Ativo.findByPk(assetId)
  return asset;
}

const getAll = async () => {

}

export { getAll, getAsset, getClientPortfolio }
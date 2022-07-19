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
  let i: number = 0; 
  const clientPortfolio = buyOrders.map((compra: IOrder) => {
    const venda: IOrder = sellOrders[i]
    const { CodCliente, CodAtivo, Ativo: { Valor } } = compra
    if (!venda || venda.CodAtivo !== CodAtivo) { /* Caso o array de vendas seja menor ou esse ativo não foi vendido é retornado a qtde comprada */
      const portfolio = {
        CodCliente,
        CodAtivo,
        QtdeAtivo: Number(compra.QtdeAtivo),
        Valor
      }
      return portfolio
    } if (venda.CodAtivo === CodAtivo) { /* Caso esse ativo tenha sido vendido pelo cliente é calculado*/
      const QtdeAtivo = compra.QtdeAtivo - venda.QtdeAtivo
      if (QtdeAtivo !== 0) {
        const portfolio: IPortfolio = {
          CodCliente,
          CodAtivo,
          QtdeAtivo,
          Valor
        }
        i += 1 /* Contador só soma uma posição quando o ativo vendido e comprado são mesmo porque o array de vendas pode ser menor que o de compras */
        return portfolio
      }
    }
  }
  ).filter((asset) => asset) /* Remove nulls causados por ativos com qtde 0 */
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
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
    if (venda && venda.CodAtivo === CodAtivo) { /* Caso esse ativo tenha sido vendido pelo cliente é calculado*/
      const QtdeAtivo = compra.QtdeAtivo - venda.QtdeAtivo
      if (QtdeAtivo !== 0) {
        const portfolio = {
          CodCliente,
          CodAtivo,
          QtdeAtivo,
          Valor
        }
        i += 1
        return portfolio
      }
      i += 1 /* Caso a qtd do ativo seja 0, o array de vendas apenas retorna null e pula para a próxima posição */
    } 
    else { /* Caso nessa posição do array de vendas o ativo vendido seja diferente ativo comprado ou essa posição não tenha uma venda*/
      const portfolio = { 
        CodCliente,
        CodAtivo,
        QtdeAtivo: Number(compra.QtdeAtivo), /* fica implícito que esse ativo comprado nunca foi vendido e por isso a qtde compra é a qtde final */
        Valor
      }
      return portfolio
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
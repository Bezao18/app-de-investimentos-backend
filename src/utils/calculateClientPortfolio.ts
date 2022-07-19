import { IAtivo, IOrder, IOrderHistory, IPortfolio } from "../interfaces"

const calculateClientPortfolio = ({ buyOrders, sellOrders }: IOrderHistory): IPortfolio[] => {
  let i = 0;
  const clientPortfolio = buyOrders.map((compra: IOrder) => {
    const venda: IOrder = sellOrders[i]
    const { CodCliente, CodAtivo, Ativo: { Valor } } = compra
    if (venda && venda.CodAtivo === CodAtivo) { /* Caso esse ativo tenha sido vendido pelo cliente é calculado*/
      const QtdeAtivo = compra.QtdeAtivo - venda.QtdeAtivo
      if (QtdeAtivo !== 0) {
        i += 1
        return { CodCliente, CodAtivo, QtdeAtivo, Valor } as IPortfolio
      }
      i += 1 /* Caso a qtd do ativo seja 0, o array de vendas apenas retorna null e pula para a próxima posição */
    }
    else { /* Caso nessa posição do array de vendas o ativo vendido seja diferente ativo comprado ou essa posição não tenha uma venda*/
      /* fica implícito que esse ativo comprado nunca foi vendido e por isso a qtde compra é a qtde final */
      return { CodCliente, CodAtivo, QtdeAtivo: Number(compra.QtdeAtivo), Valor } as IPortfolio
    }
  }).filter((asset) => asset) /* Remove nulls causados por ativos com qtde 0 */
  return clientPortfolio as IPortfolio[];
}

export default calculateClientPortfolio;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateClientPortfolio = ({ buyOrders, sellOrders }) => {
    let i = 0;
    const clientPortfolio = buyOrders.map((compra) => {
        const venda = sellOrders[i];
        const { CodCliente, CodAtivo, Ativo: { Valor } } = compra;
        if (venda && venda.CodAtivo === CodAtivo) { /* Caso esse ativo tenha sido vendido pelo cliente é calculado a diferença entre compra e venda*/
            const QtdeAtivo = compra.QtdeAtivo - venda.QtdeAtivo;
            if (QtdeAtivo === 0) {
                i += 1;
            } /* Caso a qtd do ativo seja 0, o array de vendas apenas retorna null e pula para a próxima posição */
            i += 1;
            return { CodCliente, CodAtivo, QtdeAtivo, Valor };
        }
        else { /* Caso nessa posição do array de vendas o CodAtivo seja diferente do CodAtivo comprado ou essa posição não tenha uma venda*/
            /* fica implícito que esse ativo comprado nunca foi vendido e por isso a qtde comprada é a qtde final */
            return { CodCliente, CodAtivo, QtdeAtivo: Number(compra.QtdeAtivo), Valor };
        }
    }).filter((asset) => asset); /* Remove nulls causados por ativos com qtde 0 */
    return clientPortfolio;
};
exports.default = calculateClientPortfolio;

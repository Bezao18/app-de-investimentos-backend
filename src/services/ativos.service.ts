import sequelize from 'sequelize';
import IClient from '../interfaces/IClient'
const { Ordem, Cliente, Ativo } = require('../database/models')

const getByClient = async (clientId: number): Promise<any> => {
  const clientsBuyOrders: any[] = await Ordem.findAll({
    include: [
      { model: Ativo, as: 'Ativo', attributes: ['Valor']},
    ],
    group: ['Ordem.CodAtivo', 'Ativo.CodAtivo', 'CodCliente', 'Tipo'],
    having: { CodCliente: clientId, Tipo: 'Compra' },
    attributes: [
      'CodCliente', 'CodAtivo',
      [sequelize.fn("SUM", sequelize.col('Ordem.QtdeAtivo')), 'QtdeAtivo']
      ,'Tipo'
    ],
    order: ['CodAtivo']
  }
  );

  const clientsSellOrders: any[] = await Ordem.findAll({
    include: [
      { model: Ativo, as: 'Ativo', attributes: ['Valor']}, // Esse valor representa a cotação atual
    ],
    group: ['Ordem.CodAtivo', 'Ativo.CodAtivo', 'CodCliente', 'Tipo'],
    having: { CodCliente: clientId, Tipo: 'Venda' },
    attributes: [
      'CodCliente', 'CodAtivo',
      [sequelize.fn("SUM", sequelize.col('Ordem.QtdeAtivo')), 'QtdeAtivo']
      ,'Tipo'
    ],
    order: ['CodAtivo']
  }
  );

  const test = clientsBuyOrders.map((compra, i) => {
    const venda = clientsSellOrders[i]
    if (venda.CodAtivo === compra.CodAtivo) {
      const QtdeAtivo = compra.QtdeAtivo - venda.QtdeAtivo
      const { CodCliente, CodAtivo, Ativo: {Valor} } = compra
      const object = {
        CodCliente,
        CodAtivo,
        QtdeAtivo,
        Valor
      }
      return  object
    }
  }
  )

  return test;
}





// const getByAsset = async (assetId: number) => {

// }

// const getAll = async () => {

// }

export { /* getAll, getByAsset, */ getByClient }
const { Ordem, Ativo } = require('../database/models');
import IOrder from '../interfaces/IOrder';
import sequelize from 'sequelize';

const getClientsOrders = (clientId: number, compraOuVenda: string): Promise<IOrder[]> => {
  const clientOrders: Promise<IOrder[]>  = Ordem.findAll({
    include: [
      { model: Ativo, as: 'Ativo', attributes: ['Valor'] },
    ],
    group: ['Ordem.CodAtivo', 'Ativo.CodAtivo', 'CodCliente', 'Tipo'],
    having: { CodCliente: clientId, Tipo: compraOuVenda },
    attributes: [
      'CodCliente', 'CodAtivo',
      [sequelize.fn("SUM", sequelize.col('Ordem.QtdeAtivo')), 'QtdeAtivo']
      , 'Tipo'
    ],
    order: ['CodAtivo']
  }
  );
  return clientOrders;
}

export default getClientsOrders;
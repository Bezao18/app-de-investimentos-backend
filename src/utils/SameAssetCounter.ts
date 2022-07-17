const { Ordem, Cliente, Ativo } = require('../database/models')

const countAsset = async (clientId: number): Promise<any> => {
   const clientsAssets: Promise<any>[] = await Ordem.findAll({
    include: [
      { model: Ativo, as: 'Ativo', attributes: { exclude: ['QtdeAtivo', 'CodAtivo'] }},
    ],
    where: { CodCliente: clientId, CodAtivo: 1 },
    attributes: {exclude:['QtdeAtivo']}
  });

  return clientsAssets.length;
}


const getByClient = async (clientId: number): Promise<any> => {
  const clientsAssets: Promise<any> = await Ordem.findAll({
    include: [
      { model: Ativo, as: 'Ativo', attributes: { exclude: ['QtdeAtivo', 'CodAtivo'] }},
    ],
    where: { CodCliente: clientId, CodAtivo: 1 },
    attributes: {exclude:['QtdeAtivo']}
  });

  return clientsAssets;
}

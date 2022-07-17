import IClient from '../interfaces/IClient'
const { Ordem, Cliente, Ativo } = require('../database/models')

const getByClient = async (clientId: number): Promise<any> => {
  const clientsAssets: any[] = await Ordem.findAll({
    include: [
      { model: Ativo, as: 'Ativo', attributes: { exclude: ['QtdeAtivo', 'CodAtivo'] }},
    ],
    where: { CodCliente: clientId },
    attributes: {exclude:['QtdeAtivo']}
  }
  );

  const count: any = {}
 
  const assetQuantity = clientsAssets.forEach((element) => {
    count[element.CodAtivo] = (count[element.CodAtivo] || 0) + 1;
  })
  
  const repeatedAssets =  clientsAssets.find((element:any) => element.CodAtivo === 1 )
  
  return clientsAssets;
}





// const getByAsset = async (assetId: number) => {

// }

// const getAll = async () => {

// }

export { /* getAll, getByAsset, */ getByClient }
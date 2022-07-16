import IClient from '../interfaces/IClient'
import getAssetsBy from '../models/ativos.model'

const getByClient = async (clientId: number): Promise<IClient[]> => {
  const clientsAssets: Promise<IClient[]> = getAssetsBy(clientId);
  return clientsAssets;
}

const getByAsset = async (assetId: number) => {

}

const getAll = async () => {

}

export { getAll, getByAsset, getByClient }
const { Cliente } = require('../database/models')

export const getClientInfo = (clientId: number) => {
  const clientInfo = Cliente.findByPk(clientId);
  return clientInfo;
}
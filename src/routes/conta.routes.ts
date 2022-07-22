import { Router } from 'express';
import {
  depositIntoAccount,
  getClientAccount,
  withdrawFromAccount,
  getOrdersHistory,
  getTransactionsHistory
} from '../controllers/conta.controller';
import validateTransaction from '../middlewares/validateTransaction';
import checkClient from '../middlewares/checkClient';
import validateToken from '../middlewares/validateToken';

const contaRoutes = Router();

contaRoutes.post('/deposito', validateTransaction, checkClient, depositIntoAccount);

contaRoutes.post('/saque', validateTransaction, checkClient, withdrawFromAccount);

contaRoutes.get('/:CodCliente', getClientAccount);

contaRoutes.get('/ordens/:CodCliente', getOrdersHistory)

contaRoutes.get('/transacoes/:CodCliente', getTransactionsHistory)

export default contaRoutes

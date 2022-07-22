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
import { validateCodCliente } from '../middlewares/validateReqParams';

const contaRoutes = Router();

contaRoutes.get('/:CodCliente', validateCodCliente, getClientAccount);

contaRoutes.post('/deposito', validateTransaction, checkClient, depositIntoAccount);

contaRoutes.post('/saque', validateTransaction, checkClient, withdrawFromAccount);

contaRoutes.get('/:CodCliente/ordens', validateCodCliente, getOrdersHistory)

contaRoutes.get('/:CodCliente/transacoes', validateCodCliente, getTransactionsHistory)

export default contaRoutes

import { Router } from 'express';
import { depositIntoAccount, getClientAccount, withdrawFromAccount } from '../controllers/conta.controller';
import validateTransaction from '../middlewares/validateTransaction';
import validateClient from '../middlewares/validateClient';

const contaRoutes = Router();

contaRoutes.post('/deposito', validateTransaction, validateClient, depositIntoAccount);

contaRoutes.post('/saque', validateTransaction, validateClient, withdrawFromAccount);

contaRoutes.get('/:CodCliente', getClientAccount);

export default contaRoutes

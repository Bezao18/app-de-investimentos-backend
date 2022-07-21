import { Router } from 'express';
import { depositIntoAccount, getClientAccount, withdrawFromAccount } from '../controllers/conta.controller';
import validateTransaction from '../middlewares/validateTransaction';
import checkClient from '../middlewares/checkClient';

const contaRoutes = Router();

contaRoutes.post('/deposito', validateTransaction, checkClient, depositIntoAccount);

contaRoutes.post('/saque', validateTransaction, checkClient, withdrawFromAccount);

contaRoutes.get('/:CodCliente', getClientAccount);

export default contaRoutes

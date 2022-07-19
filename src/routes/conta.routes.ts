import { Router } from 'express';
import { depositIntoAccount, getClientAccount, withdrawFromAccount } from '../controllers/conta.controller';
import validateTransaction from '../middlewares/validateTransaction';

const contaRoutes = Router();

contaRoutes.post('/deposito', validateTransaction, depositIntoAccount);

contaRoutes.post('/saque', validateTransaction, withdrawFromAccount);

contaRoutes.get('/:CodCliente', getClientAccount);

export default contaRoutes

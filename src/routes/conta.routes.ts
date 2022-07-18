import { Router } from 'express';
import { depositIntoAccount, getClientAccount, withdrawFromAccount } from '../controllers/conta.controller'

const contaRoutes = Router();

contaRoutes.post('/deposito', depositIntoAccount);

contaRoutes.post('/saque', withdrawFromAccount);

contaRoutes.get('/:CodCliente', getClientAccount);

export default contaRoutes

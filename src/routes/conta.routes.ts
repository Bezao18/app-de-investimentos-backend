import { Router } from 'express';
import { getClientAccount, withdrawFromAccount } from '../controllers/conta.controller'

const contaRoutes = Router();

contaRoutes.post('/deposito', () => { console.log('Rota funcionando') });

contaRoutes.post('/saque', withdrawFromAccount);

contaRoutes.get('/:CodCliente', getClientAccount);

export default contaRoutes

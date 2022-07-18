import { Router } from 'express';
import { getClientAccount } from '../controllers/conta.controller'

const contaRoutes = Router();

contaRoutes.post('/deposito', () => { console.log('Rota funcionando') });

contaRoutes.post('/saque', () => { console.log('Rota funcionando') });

contaRoutes.get('/:CodCliente', getClientAccount);

export default contaRoutes

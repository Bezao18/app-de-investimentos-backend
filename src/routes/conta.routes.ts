import { Router } from 'express';

const contaRoutes = Router();

contaRoutes.post('/deposito', () => { console.log('Rota funcionando') });

contaRoutes.post('/saque', () => { console.log('Rota funcionando') });

contaRoutes.get('/:CodCliente', () => { console.log('Rota funcionando') });

export default contaRoutes

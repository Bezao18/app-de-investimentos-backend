import { Router } from 'express';

const contaRoutes = Router();

contaRoutes.use('/deposito', () => { console.log('Rota funcionando') });

contaRoutes.use('/saque', () => { console.log('Rota funcionando') });

contaRoutes.use('/:CodCliente', () => { console.log('Rota funcionando') });

export default contaRoutes

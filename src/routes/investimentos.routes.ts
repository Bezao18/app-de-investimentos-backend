import { Router } from 'express';

const investimentosRoutes = Router();

investimentosRoutes.use('/comprar', () => { console.log('Rota funcionando') });

investimentosRoutes.use('/vender', () => { console.log('Rota funcionando') });

export default investimentosRoutes

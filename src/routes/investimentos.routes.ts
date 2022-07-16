import { Router } from 'express';

const investimentosRoutes = Router();

investimentosRoutes.post('/comprar', () => { console.log('Rota funcionando') });

investimentosRoutes.post('/vender', () => { console.log('Rota funcionando') });

export default investimentosRoutes

import { Router } from 'express';

const ativosRoutes = Router();

ativosRoutes.use('/', () => { console.log('Rota funcionando') });

export default ativosRoutes

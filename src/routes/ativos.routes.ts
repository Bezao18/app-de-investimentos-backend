import { Router } from 'express';

const ativosRoutes = Router();

ativosRoutes.get('/', () => { console.log('Rota funcionando') });

export default ativosRoutes

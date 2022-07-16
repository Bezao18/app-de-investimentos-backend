import { Router } from 'express';
import ativos from '../controllers/ativos.controller'

const ativosRoutes = Router();

ativosRoutes.get('/', ativos.getByParameter);

export default ativosRoutes

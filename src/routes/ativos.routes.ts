import { Router } from 'express';
import controller from '../controllers/ativos.controller'

const ativosRoutes = Router();

ativosRoutes.get('/', controller.getAssets);

export default ativosRoutes

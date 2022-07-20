import { Router } from 'express';
import validateOrder from '../middlewares/validateOrder';
import { sendBuyOrder, sendSellOrder } from '../controllers/investimentos.controller';
import validateAsset from '../middlewares/validateAsset';

const investimentosRoutes = Router();

investimentosRoutes.post('/comprar', validateOrder, validateAsset, sendBuyOrder);

investimentosRoutes.post('/vender', validateOrder, validateAsset, sendSellOrder);

export default investimentosRoutes

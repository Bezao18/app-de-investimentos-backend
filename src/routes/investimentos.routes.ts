import { Router } from 'express';
import validateOrder from '../middlewares/validateOrder';
import { sendBuyOrder, sendSellOrder } from '../controllers/investimentos.controller';
import validateAsset from '../middlewares/validateAsset';
import checkClient from '../middlewares/checkClient';


const investimentosRoutes = Router();

investimentosRoutes.post('/comprar', validateOrder, checkClient, validateAsset, sendBuyOrder);

investimentosRoutes.post('/vender', validateOrder, checkClient, validateAsset, sendSellOrder);

export default investimentosRoutes

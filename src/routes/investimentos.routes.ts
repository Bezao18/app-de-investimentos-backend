import { Router } from 'express';
import validateOrder from '../middlewares/validateOrder';
import { sendBuyOrder, sendSellOrder } from '../controllers/investimentos.controller';
import validateAsset from '../middlewares/validateAsset';
import validateClient from '../middlewares/validateClient';


const investimentosRoutes = Router();

investimentosRoutes.post('/comprar', validateOrder, validateClient, validateAsset, sendBuyOrder);

investimentosRoutes.post('/vender', validateOrder, validateClient, validateAsset, sendSellOrder);

export default investimentosRoutes

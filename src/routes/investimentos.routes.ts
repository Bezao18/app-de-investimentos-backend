import { Router } from 'express';
import validateOrder from '../middlewares/validateOrder';
import { sendBuyOrder, sendSellOrder } from '../controllers/investimentos.controller';
import checkAsset from '../middlewares/checkAsset';
import checkClient from '../middlewares/checkClient';


const investimentosRoutes = Router();

investimentosRoutes.post('/comprar', validateOrder, checkClient, checkAsset, sendBuyOrder);

investimentosRoutes.post('/vender', validateOrder, checkClient, checkAsset, sendSellOrder);

export default investimentosRoutes

import { Router } from 'express';
import validateOrder from '../middlewares/validateOrder';
import { sendBuyOrder, sendSellOrder } from '../controllers/investimentos.controller';

const investimentosRoutes = Router();

investimentosRoutes.post('/comprar', validateOrder, sendBuyOrder);

investimentosRoutes.post('/vender', validateOrder, sendSellOrder);

export default investimentosRoutes

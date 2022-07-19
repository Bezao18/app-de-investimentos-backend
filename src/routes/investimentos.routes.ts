import { Router } from 'express';
import {sendBuyOrder, sendSellOrder} from '../controllers/investimentos.controller';

const investimentosRoutes = Router();

investimentosRoutes.post('/comprar', sendBuyOrder);

investimentosRoutes.post('/vender', sendSellOrder);

export default investimentosRoutes

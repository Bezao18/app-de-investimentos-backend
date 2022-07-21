import { Router } from 'express';
import { sendBuyOrder, sendSellOrder } from '../controllers/investimentos.controller';

const cadastroRoutes = Router();

cadastroRoutes.post('/', sendBuyOrder);

export default cadastroRoutes

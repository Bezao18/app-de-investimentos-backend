import { Router } from 'express';
import { sendBuyOrder, sendSellOrder } from '../controllers/investimentos.controller';
import checkClient from '../middlewares/checkClient';


const loginRoutes = Router();

loginRoutes.post('/', checkClient, sendBuyOrder);

export default loginRoutes

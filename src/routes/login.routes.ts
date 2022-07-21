import { Router } from 'express';
import { sendBuyOrder, sendSellOrder } from '../controllers/investimentos.controller';
import validateClient from '../middlewares/validateClient';


const loginRoutes = Router();

loginRoutes.post('/', validateClient, sendBuyOrder);

export default loginRoutes

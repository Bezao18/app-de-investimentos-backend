import { Router } from 'express';
import validateClient from '../middlewares/validateClient';
import loginToAccount from '../controllers/login.controller';

const loginRoutes = Router();

loginRoutes.post('/', validateClient, loginToAccount);

export default loginRoutes

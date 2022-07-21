import { Router } from 'express';
import newClientAccount from '../controllers/cadastro.controller';
import validateClient from '../middlewares/validateClient';

const cadastroRoutes = Router();

cadastroRoutes.post('/', validateClient, newClientAccount);

export default cadastroRoutes

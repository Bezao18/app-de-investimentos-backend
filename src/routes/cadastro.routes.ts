import { Router } from 'express';
import newClientAccount from '../controllers/cadastro.controller';

const cadastroRoutes = Router();

cadastroRoutes.post('/', newClientAccount);

export default cadastroRoutes

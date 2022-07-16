import { Router } from 'express';
import investimentosRoutes from './investimentos.routes'
import ativosRoutes from './ativos.routes'
import contaRoutes from './conta.routes'

const routes = Router();

routes.use('/conta', contaRoutes)

routes.use('/investimentos', investimentosRoutes)

routes.use('/ativos', ativosRoutes)


export default routes
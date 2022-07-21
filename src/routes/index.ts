import { Router } from 'express';
import investimentosRoutes from './investimentos.routes'
import ativosRoutes from './ativos.routes'
import contaRoutes from './conta.routes'
import loginRoutes from './login.routes'
import cadastroRoutes from './cadastro.routes'

const routes = Router();

routes.use('/conta', contaRoutes)

routes.use('/investimentos', investimentosRoutes)

routes.use('/ativos', ativosRoutes)

routes.use('/login', loginRoutes)

routes.use('/cadastro', cadastroRoutes)



export default routes
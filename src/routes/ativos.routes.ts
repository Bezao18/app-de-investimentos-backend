import { Router } from 'express';
import { getAssets, getAssetsByClient } from '../controllers/ativos.controller';
import { validateCodAtivo, validateCodCliente } from '../middlewares/validateReqParams';

const ativosRoutes = Router();

ativosRoutes.get('/', getAssets);

ativosRoutes.get('/:CodAtivo', validateCodAtivo, getAssets);

ativosRoutes.get('/cliente/:CodCliente', validateCodCliente, getAssetsByClient);

export default ativosRoutes

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ativos_controller_1 = require("../controllers/ativos.controller");
const validateReqParams_1 = require("../middlewares/validateReqParams");
const ativosRoutes = (0, express_1.Router)();
ativosRoutes.get('/', ativos_controller_1.getAssets);
ativosRoutes.get('/:CodAtivo', validateReqParams_1.validateCodAtivo, ativos_controller_1.getAssets);
ativosRoutes.get('/cliente/:CodCliente', validateReqParams_1.validateCodCliente, ativos_controller_1.getAssetsByClient);
exports.default = ativosRoutes;

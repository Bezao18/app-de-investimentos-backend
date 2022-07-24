"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conta_controller_1 = require("../controllers/conta.controller");
const validateTransaction_1 = __importDefault(require("../middlewares/validateTransaction"));
const checkClient_1 = __importDefault(require("../middlewares/checkClient"));
const validateReqParams_1 = require("../middlewares/validateReqParams");
const contaRoutes = (0, express_1.Router)();
contaRoutes.get('/:CodCliente', validateReqParams_1.validateCodCliente, conta_controller_1.getClientAccount);
contaRoutes.post('/deposito', validateTransaction_1.default, checkClient_1.default, conta_controller_1.depositIntoAccount);
contaRoutes.post('/saque', validateTransaction_1.default, checkClient_1.default, conta_controller_1.withdrawFromAccount);
contaRoutes.get('/:CodCliente/ordens', validateReqParams_1.validateCodCliente, conta_controller_1.getOrdersHistory);
contaRoutes.get('/:CodCliente/transacoes', validateReqParams_1.validateCodCliente, conta_controller_1.getTransactionsHistory);
exports.default = contaRoutes;

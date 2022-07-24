"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateOrder_1 = __importDefault(require("../middlewares/validateOrder"));
const investimentos_controller_1 = require("../controllers/investimentos.controller");
const checkAsset_1 = __importDefault(require("../middlewares/checkAsset"));
const checkClient_1 = __importDefault(require("../middlewares/checkClient"));
const investimentosRoutes = (0, express_1.Router)();
investimentosRoutes.post('/comprar', validateOrder_1.default, checkClient_1.default, checkAsset_1.default, investimentos_controller_1.sendBuyOrder);
investimentosRoutes.post('/vender', validateOrder_1.default, checkClient_1.default, checkAsset_1.default, investimentos_controller_1.sendSellOrder);
exports.default = investimentosRoutes;

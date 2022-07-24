"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSellOrder = exports.sendBuyOrder = void 0;
const investimentos_service_1 = require("../services/investimentos.service");
const sendBuyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientAccount = yield (0, investimentos_service_1.newBuyOrder)(req.body);
    return res.status(200).json(clientAccount);
});
exports.sendBuyOrder = sendBuyOrder;
const sendSellOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientAccount = yield (0, investimentos_service_1.newSellOrder)(req.body);
    return res.status(200).json(clientAccount);
});
exports.sendSellOrder = sendSellOrder;

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
exports.getTransactionsHistory = exports.getOrdersHistory = exports.depositIntoAccount = exports.withdrawFromAccount = exports.getClientAccount = void 0;
const conta_service_1 = require("../services/conta.service");
const getClientAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente } = req.params;
    const clientAccount = yield (0, conta_service_1.getClientInfo)(Number(CodCliente));
    return res.status(200).json(clientAccount);
});
exports.getClientAccount = getClientAccount;
const withdrawFromAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionInfo = req.body;
    const response = yield (0, conta_service_1.withdrawRequest)(transactionInfo);
    return res.status(200).json(response);
});
exports.withdrawFromAccount = withdrawFromAccount;
const depositIntoAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionInfo = req.body;
    const response = yield (0, conta_service_1.depositRequest)(transactionInfo);
    return res.status(200).json(response);
});
exports.depositIntoAccount = depositIntoAccount;
const getOrdersHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente } = req.params;
    const response = yield (0, conta_service_1.getOrders)(Number(CodCliente));
    return res.status(200).json(response);
});
exports.getOrdersHistory = getOrdersHistory;
const getTransactionsHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente } = req.params;
    const response = yield (0, conta_service_1.getTransactions)(Number(CodCliente));
    return res.status(200).json(response);
});
exports.getTransactionsHistory = getTransactionsHistory;

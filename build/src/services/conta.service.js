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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactions = exports.getOrders = exports.depositRequest = exports.withdrawRequest = exports.getClientInfo = void 0;
const HTTPErrorMessage_1 = __importDefault(require("../utils/HTTPErrorMessage"));
const { Cliente, Ordem, Transacao } = require('../database/models');
const getClientInfo = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const clientInfo = yield Cliente.findByPk(clientId, { attributes: { exclude: ['Senha'] } });
    if (!clientInfo) {
        throw new HTTPErrorMessage_1.default(404, 'Esse cliente não existe');
    }
    return clientInfo;
});
exports.getClientInfo = getClientInfo;
const withdrawRequest = (transactionInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente, Valor } = transactionInfo;
    if (Valor <= 0) {
        throw new HTTPErrorMessage_1.default(400, `Não é possível sacar um valor negativo ou igual a zero`);
    }
    const { Saldo } = yield Cliente.findByPk(CodCliente, { attributes: ['Saldo'] });
    if (Valor > Saldo) {
        throw new HTTPErrorMessage_1.default(400, `Saldo insuficiente para sacar R$${Valor}`);
    }
    Cliente.decrement({ Saldo: Valor }, { where: { CodCliente } });
    Transacao.create({ CodCliente, Valor, Tipo: 'Saque' });
    return `Saque de R$${Valor} feito com sucesso`;
});
exports.withdrawRequest = withdrawRequest;
const depositRequest = (transactionInfo) => {
    const { CodCliente, Valor } = transactionInfo;
    if (Valor <= 0) {
        throw new HTTPErrorMessage_1.default(400, `Não é possível depositar um valor negativo ou igual a zero`);
    }
    Cliente.increment({ Saldo: Valor }, { where: { CodCliente } });
    Transacao.create({ CodCliente, Valor, Tipo: 'Depósito' });
    return `Depósito de R$${Valor} feito com sucesso`;
};
exports.depositRequest = depositRequest;
const getOrders = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield Cliente.findByPk(clientId, { attributes: ['CodCliente'] });
    if (!client) {
        throw new HTTPErrorMessage_1.default(404, 'Esse cliente não existe');
    }
    const orders = yield Ordem.findAll({ where: { CodCliente: clientId } });
    if (!orders[0]) {
        throw new HTTPErrorMessage_1.default(404, 'Esse cliente não realizou nenhuma ordem');
    }
    return orders;
});
exports.getOrders = getOrders;
const getTransactions = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield Cliente.findByPk(clientId, { attributes: ['CodCliente'] });
    if (!client) {
        throw new HTTPErrorMessage_1.default(404, 'Esse cliente não existe');
    }
    const transactions = yield Transacao.findAll({ where: { CodCliente: clientId } });
    if (!transactions[0]) {
        throw new HTTPErrorMessage_1.default(404, "Esse cliente não realizou nenhuma transação");
    }
    return transactions;
});
exports.getTransactions = getTransactions;

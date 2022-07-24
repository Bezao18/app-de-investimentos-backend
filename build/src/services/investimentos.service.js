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
exports.newSellOrder = exports.newBuyOrder = void 0;
const HTTPErrorMessage_1 = __importDefault(require("../utils/HTTPErrorMessage"));
const ativos_service_1 = require("./ativos.service");
const { Ativo, Cliente, Ordem } = require('../database/models');
const newBuyOrder = (buyOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente, CodAtivo, QtdeAtivo } = buyOrder;
    if (QtdeAtivo <= 0) {
        throw new HTTPErrorMessage_1.default(400, 'Não é possivel comprar uma quantidade negativa ou igual a zero');
    }
    const asset = yield Ativo.findByPk(CodAtivo, { attributes: ['Valor', 'QtdeAtivo'] });
    const { Saldo } = yield Cliente.findByPk(CodCliente, { attributes: ['Saldo'] });
    if (asset.QtdeAtivo < QtdeAtivo) {
        throw new HTTPErrorMessage_1.default(400, 'Quantidade de ativos indisponível');
    }
    if (Saldo < (asset.Valor * QtdeAtivo)) {
        throw new HTTPErrorMessage_1.default(400, 'Saldo insuficiente para essa operação');
    }
    Ordem.create({ CodCliente, CodAtivo, ValorPago: asset.Valor, QtdeAtivo, Tipo: 'Compra' });
    Ativo.decrement({ QtdeAtivo }, { where: { CodAtivo } });
    Cliente.decrement({ Saldo: (asset.Valor * QtdeAtivo) }, { where: { CodCliente } });
    return 'Ordem de compra executada com sucesso';
});
exports.newBuyOrder = newBuyOrder;
const newSellOrder = (sellOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente, CodAtivo, QtdeAtivo } = sellOrder;
    if (QtdeAtivo <= 0) {
        throw new HTTPErrorMessage_1.default(400, 'Não é possivel vender uma quantidade negativa ou igual a zero');
    }
    const asset = yield Ativo.findByPk(CodAtivo, { attributes: ['Valor', 'QtdeAtivo'] });
    const portfolio = yield (0, ativos_service_1.getClientPortfolio)(CodCliente);
    const selectedAsset = portfolio.find((asset) => asset.CodAtivo === CodAtivo);
    if (!selectedAsset || selectedAsset.QtdeAtivo < QtdeAtivo) {
        throw new HTTPErrorMessage_1.default(400, 'Ativos suficientes para essa operação');
    }
    Ordem.create({ CodCliente, CodAtivo, ValorPago: asset.Valor, QtdeAtivo, Tipo: 'Venda' });
    Ativo.increment({ QtdeAtivo }, { where: { CodAtivo } });
    Cliente.increment({ Saldo: (asset.Valor * QtdeAtivo) }, { where: { CodCliente } });
    return 'Ordem de venda executada com sucesso';
});
exports.newSellOrder = newSellOrder;

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
exports.getClientPortfolio = exports.getAsset = exports.getAll = void 0;
const calculateClientPortfolio_1 = __importDefault(require("../utils/calculateClientPortfolio"));
const { Ativo, Cliente } = require('../database/models');
const getClientsOrders_1 = __importDefault(require("../utils/getClientsOrders"));
const HTTPErrorMessage_1 = __importDefault(require("../utils/HTTPErrorMessage"));
const getClientPortfolio = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield Cliente.findByPk(clientId, { attributes: ['CodCliente'] });
    if (!client) {
        throw new HTTPErrorMessage_1.default(404, 'Esse cliente não existe');
    }
    const buyOrders = yield (0, getClientsOrders_1.default)(clientId, 'Compra');
    const sellOrders = yield (0, getClientsOrders_1.default)(clientId, 'Venda');
    const clientPortfolio = (0, calculateClientPortfolio_1.default)({ buyOrders, sellOrders });
    if (!clientPortfolio[0]) {
        throw new HTTPErrorMessage_1.default(404, 'Esse cliente não possui nenhum ativo');
    }
    return clientPortfolio;
});
exports.getClientPortfolio = getClientPortfolio;
const getAsset = (assetId) => __awaiter(void 0, void 0, void 0, function* () {
    const asset = yield Ativo.findByPk(assetId);
    if (!asset) {
        throw new HTTPErrorMessage_1.default(404, 'Esse ativo não existe');
    }
    return asset;
});
exports.getAsset = getAsset;
const getAll = () => {
    const asset = Ativo.findAll();
    return asset;
};
exports.getAll = getAll;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Ordem, Ativo } = require('../database/models');
const sequelize_1 = __importDefault(require("sequelize"));
const getClientsOrders = (clientId, compraOuVenda) => {
    const clientOrders = Ordem.findAll({
        include: [
            { model: Ativo, as: 'Ativo', attributes: ['Valor'] },
        ],
        group: ['Ordem.CodAtivo', 'Ativo.CodAtivo', 'CodCliente', 'Tipo'],
        having: { CodCliente: clientId, Tipo: compraOuVenda },
        attributes: ['CodCliente', 'CodAtivo', [sequelize_1.default.fn("SUM", sequelize_1.default.col('Ordem.QtdeAtivo')), 'QtdeAtivo'], 'Tipo'],
        order: ['CodAtivo']
    });
    return clientOrders;
};
exports.default = getClientsOrders;

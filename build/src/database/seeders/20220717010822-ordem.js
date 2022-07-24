'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert('Ordems', [{
                    CodCliente: 1,
                    CodAtivo: 1,
                    QtdeAtivo: 200,
                    ValorDaOrdem: 50.53,
                    Tipo: 'Compra'
                },
                {
                    CodCliente: 1,
                    CodAtivo: 2,
                    QtdeAtivo: 200,
                    ValorDaOrdem: 68.55,
                    Tipo: 'Compra'
                },
                {
                    CodCliente: 2,
                    CodAtivo: 4,
                    QtdeAtivo: 500,
                    ValorDaOrdem: 80.42,
                    Tipo: 'Compra'
                },
                {
                    CodCliente: 3,
                    CodAtivo: 3,
                    QtdeAtivo: 1000,
                    ValorDaOrdem: 17.55,
                    Tipo: 'Compra'
                },
                {
                    CodCliente: 1,
                    CodAtivo: 1,
                    QtdeAtivo: 400,
                    ValorDaOrdem: 58.55,
                    Tipo: 'Compra'
                },
                {
                    CodCliente: 1,
                    CodAtivo: 1,
                    QtdeAtivo: 100,
                    ValorDaOrdem: 58.55,
                    Tipo: 'Venda'
                },
                {
                    CodCliente: 1,
                    CodAtivo: 2,
                    QtdeAtivo: 100,
                    ValorDaOrdem: 58.55,
                    Tipo: 'Venda'
                },
                {
                    CodCliente: 1,
                    CodAtivo: 2,
                    QtdeAtivo: 500,
                    ValorDaOrdem: 58.55,
                    Tipo: 'Compra'
                },
                {
                    CodCliente: 1,
                    CodAtivo: 3,
                    QtdeAtivo: 600,
                    ValorDaOrdem: 58.55,
                    Tipo: 'Compra'
                },
            ], { timestamps: false });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('Ordems', null, {});
        });
    }
};

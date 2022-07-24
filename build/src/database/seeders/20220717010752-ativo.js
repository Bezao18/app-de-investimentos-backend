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
            yield queryInterface.bulkInsert('Ativos', [{
                    Valor: 12.5,
                    QtdeAtivo: 100000,
                },
                {
                    Valor: 15,
                    QtdeAtivo: 15000,
                },
                {
                    Valor: 42.3,
                    QtdeAtivo: 100000,
                },
                {
                    Valor: 24.6,
                    QtdeAtivo: 15500,
                },
                {
                    Valor: 24.6,
                    QtdeAtivo: 100,
                },
            ], { timestamps: false });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('Ativos', null, {});
        });
    }
};

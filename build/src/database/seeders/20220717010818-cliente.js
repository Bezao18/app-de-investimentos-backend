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
            yield queryInterface.bulkInsert('Clientes', [
                {
                    Email: 'silviosantos@email.com',
                    Senha: "$2a$05$sklaf2Otch48tRK2jDkMuO21Vc8D9JILTQrfKQe2FQQ0VuvzrOqn.",
                    Saldo: 25688000.12,
                },
                {
                    Email: 'fulano@email.com',
                    Senha: "$2a$05$23uBUzzIczc8fuyBAoQc0eNtjIcZ4dgIVGV0yvCxt90Lntd/PrMf2",
                    Saldo: 15484.55,
                },
                {
                    Email: 'jorgin@email.com',
                    Senha: "$2a$05$BpIgYCEWt2u3I/qoXtcPdOPjTOUIe9CgdcKs15PGMMSd1Xfa3qSuS",
                    Saldo: 1481.33,
                },
                {
                    Email: 'loremipsum@email.com',
                    Senha: "$2a$05$PV0G6Ofcuv3AaRiqALi.0eRRqI96m5mqIoSf8E/yZhlq/3QSDDybK",
                    Saldo: 0,
                },
            ], { timestamps: false });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('Clientes', null, {});
        });
    }
};

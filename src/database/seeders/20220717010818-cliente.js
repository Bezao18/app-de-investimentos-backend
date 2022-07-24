'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clientes',
      [
        {
          CodCliente:1,
          Email: 'silviosantos@email.com',
          Senha: "$2a$05$sklaf2Otch48tRK2jDkMuO21Vc8D9JILTQrfKQe2FQQ0VuvzrOqn.",
          Saldo: 25688000.12,
        },
        {
          CodCliente:2,
          Email: 'fulano@email.com',
          Senha: "$2a$05$23uBUzzIczc8fuyBAoQc0eNtjIcZ4dgIVGV0yvCxt90Lntd/PrMf2",
          Saldo: 15484.55,
        },
        {
          CodCliente:3,
          Email: 'jorgin@email.com',
          Senha: "$2a$05$BpIgYCEWt2u3I/qoXtcPdOPjTOUIe9CgdcKs15PGMMSd1Xfa3qSuS",
          Saldo: 1481.33,
        },
        {
          CodCliente:4,
          Email: 'loremipsum@email.com',
          Senha: "$2a$05$PV0G6Ofcuv3AaRiqALi.0eRRqI96m5mqIoSf8E/yZhlq/3QSDDybK",
          Saldo: 0,
        },
      ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};

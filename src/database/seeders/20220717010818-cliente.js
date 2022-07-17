'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clientes',
      [{
        CodCliente: 1,
        Saldo: 15484.55,
      },
      {
        CodCliente: 2,
        Saldo: 25688.12,
      }, {
        CodCliente: 3,
        Saldo: 1481.33,
      },
      {
        CodCliente: 4,
        Saldo: 150357.25,
      },
      ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clientes',
      [{
        Saldo: 15484.55,
      },
      {
        Saldo: 25688.12,
      }, {
        Saldo: 1481.33,
      },
      {
        Saldo: 150357.25,
      },
      ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};

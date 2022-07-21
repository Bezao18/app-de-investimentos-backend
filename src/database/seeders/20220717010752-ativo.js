'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ativos',
    [{
      Valor: 12.5,
      QtdeAtivo:100000,
    },
    {
      Valor: 15,
      QtdeAtivo:15000,
    },
    {
      Valor: 42.3,
      QtdeAtivo:100000,
    },
    {
      Valor: 24.6,
      QtdeAtivo:15500,
    },
    {
      Valor: 24.6,
      QtdeAtivo:100,
    },
    ], { timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ativos', null, {});
  }
};

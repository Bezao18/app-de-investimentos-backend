'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ativos',
    [{
      CodAtivo: 1,
      Valor: 12.5,
      QtdeAtivo:100,
    },
    {
      CodAtivo: 2,
      Valor: 15,
      QtdeAtivo:15000,
    },
    {
      CodAtivo: 3,
      Valor: 42.3,
      QtdeAtivo:100000,
    },
    {
      CodAtivo: 4,
      Valor: 24.6,
      QtdeAtivo:15500,
    },
    ], { timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ativos', null, {});
  }
};

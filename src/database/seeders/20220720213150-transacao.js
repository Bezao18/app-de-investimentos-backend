'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transacaos',[
      {
        CodCliente: 1,
        Valor:25688000,
        Tipo:'Depósito'
      },
      {
        CodCliente: 2,
        Valor:15484.5,
        Tipo:'Depósito'
      },
      {
        CodCliente: 3,
        Valor:1481.33,
        Tipo:'Depósito'
      },
      {
        CodCliente: 4,
        Valor:150357,
        Tipo:'Depósito'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Transacaos', null, {});
  }
};

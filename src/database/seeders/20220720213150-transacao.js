'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transacaos',[
      {
        CodCliente: 1,
        Valor:1200,
        Tipo:'Depósito'
      },
      {
        CodCliente: 2,
        Valor:250,
        Tipo:'Saque'
      },
      {
        CodCliente: 1,
        Valor:350,
        Tipo:'Saque'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Transacaos', null, {});
  }
};

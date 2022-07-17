'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ordems',
      [{
        OrdemId: 1,
        CodCliente: 1,
        CodAtivo: 1,
        QtdeAtivo: 200,
        ValorPago: 50.53,
        Tipo: 'Compra'
      },
      {
        OrdemId: 2,
        CodCliente: 1,
        CodAtivo: 2,
        QtdeAtivo: 200,
        ValorPago: 68.55,
        Tipo: 'Compra'
      },
      {
        OrdemId: 3,
        CodCliente: 2,
        CodAtivo: 4,
        QtdeAtivo: 500,
        ValorPago: 80.42,
        Tipo: 'Compra'
      },
      {
        OrdemId: 4,
        CodCliente: 3,
        CodAtivo: 3,
        QtdeAtivo: 1000,
        ValorPago: 17.55,
        Tipo: 'Compra'
      }, {
        OrdemId: 5,
        CodCliente: 1,
        CodAtivo: 1,
        QtdeAtivo: 400,
        ValorPago: 58.55,
        Tipo: 'Compra'
      },
      ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ordems', null, {});
  }
}

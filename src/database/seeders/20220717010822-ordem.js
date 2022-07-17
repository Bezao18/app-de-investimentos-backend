'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ordens',
      [{
        OrdemId: 1,
        CodCliente: 1,
        CodAtivo: 1,
        QtdeAtivo: 200,
        Valor: 50.53,
        Tipo:'Compra'
      },
      {
        OrdemId: 2,
        CodCliente: 1,
        CodAtivo: 2,
        QtdeAtivo: 200,
        Valor: 68.55,
        Tipo:'Compra'
      },
      {
        OrdemId: 3,
        CodCliente: 2,
        CodAtivo: 4,
        QtdeAtivo: 500,
        Valor: 80.42,
        Tipo:'Compra'
      },
      {
        OrdemId: 4,
        CodCliente: 3,
        CodAtivo: 3,
        QtdeAtivo: 1000,
        Valor: 17.55,
        Tipo:'Compra'
      },
      ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ordens', null, {});
  }
}

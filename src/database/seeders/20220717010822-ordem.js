'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ordems',
      [{
        CodCliente: 1,
        CodAtivo: 1,
        QtdeAtivo: 200,
        ValorDaOrdem: 50.53,
        Tipo: 'Compra'
      },
      {
        CodCliente: 1,
        CodAtivo: 2,
        QtdeAtivo: 200,
        ValorDaOrdem: 68.55,
        Tipo: 'Compra'
      },
      {
        CodCliente: 2,
        CodAtivo: 4,
        QtdeAtivo: 500,
        ValorDaOrdem: 80.42,
        Tipo: 'Compra'
      },
      {
        CodCliente: 3,
        CodAtivo: 3,
        QtdeAtivo: 1000,
        ValorDaOrdem: 17.55,
        Tipo: 'Compra'
      }, 
      {
        CodCliente: 1,
        CodAtivo: 1,
        QtdeAtivo: 400,
        ValorDaOrdem: 58.55,
        Tipo: 'Compra'
      },
      {
        CodCliente: 1,
        CodAtivo: 1,
        QtdeAtivo: 100,
        ValorDaOrdem: 58.55,
        Tipo: 'Venda'
      },
      {
        CodCliente: 1,
        CodAtivo: 2,
        QtdeAtivo: 100,
        ValorDaOrdem: 58.55,
        Tipo: 'Venda'
      },
      {
        CodCliente: 1,
        CodAtivo: 2,
        QtdeAtivo: 500,
        ValorDaOrdem: 58.55,
        Tipo: 'Compra'
      },
      {
        CodCliente: 1,
        CodAtivo: 3,
        QtdeAtivo: 600,
        ValorDaOrdem: 58.55,
        Tipo: 'Compra'
      },
      
      ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ordems', null, {});
  }
}

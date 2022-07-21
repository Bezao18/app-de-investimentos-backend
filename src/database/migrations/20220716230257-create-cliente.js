'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      CodCliente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Email:{
        allowNull: false,
        type: Sequelize.STRING
      },
      Senha:{
        allowNull: false,
        type: Sequelize.STRING
      },
      Saldo: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};
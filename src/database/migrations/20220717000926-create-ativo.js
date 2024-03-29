'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      CodAtivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      QtdeAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },     
      Valor: {
        type: Sequelize.FLOAT(20,2)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ativos');
  }
};
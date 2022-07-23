'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transacaos', {
      TransacaoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CodCliente:{
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Clientes',
          key: 'CodCliente'
        }
      },
      Valor:{
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      Tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Horário: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transacaos');
  }
};
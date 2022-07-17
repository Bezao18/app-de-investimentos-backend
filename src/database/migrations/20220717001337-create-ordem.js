'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ordens', {
      OrdemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CodAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'CodAtivo'
        }
      },
      CodCliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'CodCliente'
        }
      },
      Valor: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      Tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Horário: Sequelize.DATE,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ordens');
  }
};
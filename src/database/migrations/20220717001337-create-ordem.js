'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ordens', {
      OrdemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, CodCliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'CodCliente'
        }
      },
      CodAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'CodAtivo'
        }
      },
      QtdeAtivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },     
      Valor: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      Tipo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Horário: {
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
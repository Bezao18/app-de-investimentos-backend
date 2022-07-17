'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ordem = sequelize.define("Ordem", {
    OrdemId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    CodCliente: DataTypes.INTEGER,
    CodAtivo: DataTypes.INTEGER,
    QtdeAtivo: DataTypes.INTEGER,
    Valor: DataTypes.FLOAT,
    Tipo: DataTypes.STRING,
    Horário: DataTypes.DATE,
  }, { timestamps: false });

  Ordem.associate = (models) => {
    Ordem.belongsTo(models.Cliente,
      { foreignKey: 'CodCliente', as: 'Ordens' })
    Ordem.belongsTo(models.Ativo,
      { foreignKey: 'CodAtivo', as: 'Ordens' })
  }


  return Ordem;
};
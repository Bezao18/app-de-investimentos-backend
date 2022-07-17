'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define("Cliente", {
    CodCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Saldo: DataTypes.FLOAT,
  }, { timestamps: false });

  Cliente.associate = (models) => {
    Cliente.hasMany(models.Ordem,
      {foreignKey:'CodCliente', as: 'Ordens'})
  }

  return Cliente;
};
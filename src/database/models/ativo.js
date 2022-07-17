'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define("Ativo", {
    CodAtivo: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    Valor: DataTypes.FLOAT,
  }, { timestamps: false });

  Ativo.associate = (models) => {
   
  }

  return Ativo;
};
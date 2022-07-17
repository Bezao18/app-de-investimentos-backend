'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ordem = sequelize.define("Ordem", {
    OrdemId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    CodAtivo: DataTypes.INTEGER,
    CodCliente: DataTypes.INTEGER,
    Valor: DataTypes.FLOAT,
    Tipo: DataTypes.STRING,
    Horário: DataTypes.DATE,
  }, { timestamps: false });

  Ordem.associate = (models) => {
   
  }

  return Ordem;
};
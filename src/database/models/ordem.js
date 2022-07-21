module.exports = (sequelize, DataTypes) => {
  const Ordem = sequelize.define("Ordem", {
    OrdemId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    CodCliente: DataTypes.INTEGER,
    CodAtivo: DataTypes.INTEGER,
    QtdeAtivo: DataTypes.INTEGER,
    ValorDaOrdem: DataTypes.FLOAT,
    Tipo: DataTypes.STRING,
    Horário: DataTypes.DATE,
  }, { timestamps: false });

  Ordem.associate = (models) => {
    Ordem.belongsTo(models.Ativo,
      { foreignKey: 'CodAtivo', as: 'Ativo' })
    Ordem.belongsTo(models.Cliente,
      { foreignKey: 'CodCliente', as: 'Cliente' })
  }


  return Ordem;
};
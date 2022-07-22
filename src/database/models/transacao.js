module.exports = (sequelize, DataTypes) => {
  const Transacao = sequelize.define("Transacao", {
    TransacaoId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    CodCliente: DataTypes.INTEGER,
    Valor: DataTypes.FLOAT(20,2),
    Tipo: DataTypes.STRING,
    Horário: DataTypes.DATE,
  }, { timestamps: false });

  Transacao.associate = (models) => {
    Transacao.belongsTo(models.Cliente,
      { foreignKey: 'CodCliente', as: 'Cliente' })
  }


  return Transacao;
};
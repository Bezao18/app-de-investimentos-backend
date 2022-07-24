"use strict";
module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define("Cliente", {
        CodCliente: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Email: DataTypes.STRING,
        Senha: DataTypes.STRING,
        Saldo: DataTypes.FLOAT(20, 2),
    }, { timestamps: false });
    Cliente.associate = (models) => {
        Cliente.hasMany(models.Ordem, { foreignKey: 'CodCliente', as: 'Ordens' });
        Cliente.hasMany(models.Transacao, { foreignKey: 'CodCliente', as: 'Transações' });
    };
    return Cliente;
};

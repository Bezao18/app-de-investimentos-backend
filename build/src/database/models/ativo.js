"use strict";
module.exports = (sequelize, DataTypes) => {
    const Ativo = sequelize.define("Ativo", {
        CodAtivo: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        QtdeAtivo: DataTypes.INTEGER,
        Valor: DataTypes.FLOAT(20, 2),
    }, { timestamps: false });
    Ativo.associate = (models) => {
        Ativo.hasMany(models.Ordem, { foreignKey: 'CodAtivo', as: 'Ordens' });
    };
    return Ativo;
};

const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

class Borderau extends Model {}

Borderau.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        unit: {
            type: DataTypes.STRING,
        },
        production: {
            type: DataTypes.INTEGER,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        total_price: {
            type: DataTypes.INTEGER,
        },
    },
    { sequelize, modelName: 'Borderau', timestamps: false },
);

// hierarchy de sous dossier
Borderau.hasMany(Borderau);
Borderau.belongsTo(Borderau);

module.exports = Borderau;

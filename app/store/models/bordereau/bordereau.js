const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

class Bordereau extends Model {}

Bordereau.init(
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
        unit_price: {
            type: DataTypes.INTEGER,
        },
        total_price: {
            type: DataTypes.INTEGER,
        },
        production: {
            type: DataTypes.INTEGER,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
    },
    { sequelize, modelName: 'Bordereau', timestamps: false, freezeTableName: true },
);

// hierarchy de sous dossier
Bordereau.hasMany(Bordereau);
Bordereau.belongsTo(Bordereau);

module.exports = Bordereau;

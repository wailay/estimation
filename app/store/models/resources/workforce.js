const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

class Workforce extends Model {}

Workforce.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        unit_price: {
            type: DataTypes.INTEGER,
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'W',
        },
    },
    { sequelize, modelName: 'Workforce', timestamps: false },
);

module.exports = Workforce;

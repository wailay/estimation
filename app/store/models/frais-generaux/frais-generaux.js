const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

class FraisGeneraux extends Model {}

FraisGeneraux.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        total_price: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
    },
    { sequelize, modelName: 'FraisGeneraux', timestamps: false, freezeTableName: true },
);

module.exports = FraisGeneraux;

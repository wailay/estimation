const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

class TeamResources extends Model {}

TeamResources.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        unit_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    { sequelize, modelName: 'TeamResources', timestamps: false },
);

module.exports = { TeamResources };

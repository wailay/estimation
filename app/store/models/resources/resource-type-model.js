const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

class ResourceType extends Model {}

ResourceType.init(
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
            allowNull: false,
            unique: true,
        },
    },
    { sequelize, modelName: 'ResourceType', timestamps: false },
);

class ResourceDetail extends Model {}

ResourceDetail.init(
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
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transport: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { sequelize, modelName: 'ResourceDetail', timestamps: false },
);

module.exports = { ResourceType, ResourceDetail };

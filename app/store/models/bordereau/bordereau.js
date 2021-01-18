const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');
const Resource = require('../resources/resource-model');

class Bordereau extends Model {}

Bordereau.init(
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
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
        unit: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        b_unit_price: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
        total_price: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
        total_price_vendant: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
    },
    { sequelize, modelName: 'Bordereau', timestamps: false, freezeTableName: true },
);

class BordereauResource extends Model {}

BordereauResource.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        production: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        duration: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        total_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    { sequelize, modelName: 'BordereauResource', timestamps: false, freezeTableName: true },
);

// hierarchy de sous dossier
Bordereau.hasMany(Bordereau);
Bordereau.belongsTo(Bordereau);

Bordereau.belongsToMany(Resource, { through: BordereauResource });
Resource.belongsToMany(Bordereau, { through: BordereauResource });

module.exports = { Bordereau, BordereauResource };

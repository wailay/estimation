const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');
const Project = require('../project/project-model');
const Resource = require('../resources/resource-model');

class FraisGeneraux extends Model {}

FraisGeneraux.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
        unit: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        unit_price: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
        total_price: {
            type: DataTypes.INTEGER,
            defaultValue: '',
        },
    },
    { sequelize, modelName: 'FraisGeneraux', timestamps: false, freezeTableName: true },
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

Project.hasMany(Bordereau);
Bordereau.belongsTo(Project);

module.exports = { Bordereau, BordereauResource };

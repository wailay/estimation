const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');
const { TeamResources } = require('../team/team');
const EquipementDetail = require('./equipements-detail');
class Resource extends Model {}

Resource.init(
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
        },
        unit_price: {
            type: DataTypes.INTEGER,
        },
        fixed_price: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    { sequelize, modelName: 'Resource', timestamps: false },
);

// hierarchy de sous dossier
Resource.hasMany(Resource);
Resource.belongsTo(Resource);

// EquipementDetail
Resource.hasMany(EquipementDetail, { foreignKey: { name: 'ResourceId', allowNull: false } });
Resource.hasMany(EquipementDetail, { foreignKey: { name: 'EquipementId', allowNull: false } });
EquipementDetail.belongsTo(Resource);

// hierarchy de sous dossier
Resource.belongsToMany(Resource, { through: TeamResources, as: 'Team', foreignKey: 'TeamId' });
Resource.belongsToMany(Resource, { through: TeamResources, as: 'TeamResource', foreignKey: 'TeamResourceId' });
module.exports = Resource;

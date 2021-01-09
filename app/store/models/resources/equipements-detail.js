const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

class EquipementDetail extends Model {}

EquipementDetail.init(
    {
        unit_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    { sequelize, modelName: 'EquipementDetail', timestamps: false },
);

module.exports = EquipementDetail;

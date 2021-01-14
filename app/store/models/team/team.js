const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

// class Team extends Model {}

// Team.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         code: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         description: {
//             type: DataTypes.STRING,
//         },
//         unit: {
//             type: DataTypes.STRING,
//         },
//         unit_price: {
//             type: DataTypes.INTEGER,
//             defaultValue: 0,
//         },
//     },
//     { sequelize, modelName: 'Team', timestamps: false },
// );

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

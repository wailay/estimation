const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../db');

class Project extends Model {}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        client: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checked: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        total_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    { sequelize, timestamps: false },
);

module.exports = Project;

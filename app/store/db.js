const { Sequelize } = require('sequelize');
const path = require('path');
const { app } = require('electron');
const dbPath =
    process.env.NODE_ENV === 'development' ? path.join(__dirname, 'estimation.sqlite') : path.join(app.getAppPath(), '../store/estimation.sqlite');

const sequelize = new Sequelize('database', 'username', '', {
    dialect: 'sqlite',
    storage: dbPath, // eslint-disable-line
    logging: false,
});

async function syncDb() {
    await sequelize.sync();
    // await sequelize.sync({ alter: true });
    // await sequelize.drop();
    // await sequelize.sync({ force: true });
}

module.exports = { sequelize, syncDb };

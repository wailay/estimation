const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('database', 'username', '', {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'estimation.sqlite'), // eslint-disable-line
    logging: console.log,
});

async function syncDb() {
    // await sequelize.sync();
    await sequelize.sync({ force: true });
}

module.exports = { sequelize, syncDb };

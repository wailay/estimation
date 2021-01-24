const { Sequelize } = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('database', 'username', '', {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'estimation.sqlite'), // eslint-disable-line
    logging: false,
});

async function syncDb() {
    await sequelize.sync();
    // await sequelize.sync({ alter: true });
    // await sequelize.drop();
    // await sequelize.sync({ force: true });
}

module.exports = { sequelize, syncDb };

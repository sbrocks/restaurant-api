const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("restaurant_db", process.env.USERNAME, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});

module.exports = sequelize;

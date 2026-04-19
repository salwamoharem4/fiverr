const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fiverr_db', 'your_username', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Keeps the console clean
});

module.exports = sequelize;
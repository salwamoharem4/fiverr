const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fiverr_db', 'root', 'your_actual_password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
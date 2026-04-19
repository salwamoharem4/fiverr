const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fiverr_clone', 'root', 'salwa1792006-', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = sequelize;
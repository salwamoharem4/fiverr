const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: {
        type: DataTypes.ENUM('buyer', 'seller', 'admin'),
        defaultValue: 'buyer'
    }
}, { timestamps: true });
const bcrypt = require('bcryptjs');

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password_hash = await bcrypt.hash(user.password_hash, salt);
});
module.exports = User;
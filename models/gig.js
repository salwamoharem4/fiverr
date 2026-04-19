const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gig = sequelize.define('Gig', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING },
    status: {
        type: DataTypes.ENUM('draft', 'active', 'paused'),
        defaultValue: 'draft'
    }
}, { timestamps: true });

module.exports = Gig;
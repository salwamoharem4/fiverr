const sequelize = require('../config/database');
const User = require('./users');
const Gig = require('./gig');

User.hasMany(Gig, {
    foreignKey: 'seller_id',
    as: 'gigs'
});
Gig.belongsTo(User, {
    foreignKey: 'seller_id',
    as: 'seller'
});

sequelize.sync({ alter: true })
    .then(() => console.log("Database & tables recreated!"))
    .catch(err => console.log("Error: " + err));

module.exports = { User, Gig };
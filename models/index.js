const sequelize = require('../config/database');
const User = require('./users');
const Gig = require('./gig');

User.hasMany(Gig, { foreignKey: 'seller_id' });
Gig.belongsTo(User, { as: 'seller', foreignKey: 'seller_id' });

sequelize.sync({ alter: true }) 
    .then(() => console.log("Database & tables created!"))
    .catch(err => console.log("Error: " + err));
module.exports = { User, Gig };
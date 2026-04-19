const sequelize = require('../config/database');
const User = require('./users'); 
const Gig = require('./gig'); 

User.hasMany(Gig, { foreignKey: 'seller_id' });
Gig.belongsTo(User, { as: 'seller', foreignKey: 'seller_id' });

// Sync with Database
sequelize.sync({ alter: true }) // 'alter' updates tables without deleting data
    .then(() => console.log("Database & tables created!"))
    .catch(err => console.log("Error: " + err));
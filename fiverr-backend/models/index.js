const sequelize = require('./config/database');
const User = require('./models/User');
const Gig = require('./models/Gig');

// Define Relationships (The "Lines" in your ERD)
User.hasMany(Gig, { foreignKey: 'seller_id' });
Gig.belongsTo(User, { as: 'seller', foreignKey: 'seller_id' });

// Sync with Database
sequelize.sync({ alter: true }) // 'alter' updates tables without deleting data
    .then(() => console.log("Database & tables created!"))
    .catch(err => console.log("Error: " + err));
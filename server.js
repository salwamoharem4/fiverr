const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json()); // This allows your server to read JSON from Postman

// Routes
app.use('/api/users', userRoutes);

const PORT = 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(` Server running on http://localhost:${PORT}`);
    });
});
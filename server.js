const express = require('express');
const app = express();

const models = require('./models');
const sequelize = require('./config/database');

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const gigRoutes = require('./routes/gigRoutes');

app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        const userResponse = newUser.toJSON();
        delete userResponse.password_hash;

        res.status(201).json({
            message: "User registered successfully!",
            user: userResponse
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

       
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret', 
            { expiresIn: '24h' }
        );

        res.json({
            message: "Login successful!",
            token,
            user: { id: user.id, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password_hash'] } 
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
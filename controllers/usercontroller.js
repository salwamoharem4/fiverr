const { User } = require('../models');

exports.createUser = async (req, res) => {
    console.log("DEBUG: Request Body:", req.body);
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "User created!", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
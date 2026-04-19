const { User } = require('../models');

exports.createUser = async (req, res) => {
    try {
        // req.body is the data you send from Postman
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "User created!", user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};
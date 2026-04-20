const { Gig, User } = require('../models');
exports.createGig = async (req, res) => {
    try {
        const newGig = await Gig.create(req.body);
        res.status(201).json({ message: "Gig created successfully!", gig: newGig });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllGigs = async (req, res) => {
    try {
        const gigs = await Gig.findAll({
           
            include: [{ model: User, as: 'seller', attributes: ['name', 'email'] }]
        });
        res.json(gigs);
    } catch (error) {
        res.status(500).json({ error: "Database error while fetching gigs" });
    }
};
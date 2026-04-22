const { Gig, User } = require('../models');

exports.createGig = async (req, res) => {
    try {
        const gigData = {
            ...req.body,
            seller_id: req.user.id 
        };

        const newGig = await Gig.create(gigData);
        res.status(201).json({ message: "Gig created!", gig: newGig });
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
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGig = async (req, res) => {
    try {
        const result = await Gig.destroy({ where: { id: req.params.id } });
        res.json({ message: result ? "Deleted" : "Not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
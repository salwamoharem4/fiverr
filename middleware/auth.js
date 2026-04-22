const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get token from header (Format: "Bearer <token>")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        req.user = verified; 
        next(); 
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

module.exports = verifyToken;
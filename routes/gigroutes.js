const express = require('express');
const router = express.Router();
const gigController = require('../controllers/gigcontroller');
const verifyToken = require('../middleware/auth'); 

router.get('/', gigController.getAllGigs);

// Protected route (Token REQUIRED)
router.post('/', verifyToken, gigController.createGig);

module.exports = router;
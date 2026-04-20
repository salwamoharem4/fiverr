const router = require('express').Router();
const gigController = require('../controllers/gigController');
router.post('/', gigController.createGig);
router.get('/', gigController.getAllGigs);
module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// When Postman hits POST /api/users, run the createUser function
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

module.exports = router;
const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Login route
router.post('/login', adminController.login);

// Protected route for getting users
router.get('/users', adminController.authenticateToken, adminController.getUsers);

module.exports = router;

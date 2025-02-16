// Handling login and registration routes
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register Route
router.post('/register', (req, res, next) => {
    console.log("Incoming POST request to /api/auth/register"); 
    next();
}, registerUser);

// Login Route
router.post('/login', (req, res, next) => {
    console.log("Incoming POST request to /api/auth/login"); 
    next();
}, loginUser);

module.exports = router;


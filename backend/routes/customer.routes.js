const express = require('express');
const router = express.Router();
const { registerCustomer, loginCustomer, getMyProfile, logoutCustomer } = require('../controllers/customer.controller');
const { protect } = require('../middlewares/auth.middleware');

// Route: POST /customers/register
router.post('/register', registerCustomer);

// Route: POST /customers/login
router.post('/login', loginCustomer);

// Route: GET /customers/me (Protected Route)
router.get('/me', protect, getMyProfile);

// Route: POST /customers/logout (Protected Route)
router.post('/logout', protect, logoutCustomer);

module.exports = router;

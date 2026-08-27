const express = require('express');
const router = express.Router();
const { registerCustomer, loginCustomer } = require('../controllers/customer.controller');

// Route: POST /customers/register
router.post('/register', registerCustomer);

// Route: POST /customers/login
router.post('/login', loginCustomer);

module.exports = router;

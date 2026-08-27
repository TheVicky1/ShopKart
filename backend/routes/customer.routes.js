const express = require('express');
const router = express.Router();
const { registerCustomer } = require('../controllers/customer.controller');

// Route: POST /customers/register
router.post('/register', registerCustomer);

module.exports = router;

const jwt = require('jsonwebtoken');

// Simple utility function to generate a JWT for a customer
const generateToken = (customerId) => {
    // Sign the token using customerId as the payload and the secret key from .env
    return jwt.sign(
        { id: customerId },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Token expires in 1 day
    );
};

module.exports = generateToken;

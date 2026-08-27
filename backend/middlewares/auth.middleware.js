const jwt = require('jsonwebtoken');
const Customer = require('../models/customer.model');

// Middleware to protect routes and verify authentication
const protect = async (req, res, next) => {
    try {
        // 1. Read token from cookie
        const token = req.cookies.token;

        // 2. If token does not exist, return 401 Unauthorized
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        // 3. Verify JWT using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Get customer ID from verified payload and find customer in MongoDB
        const customer = await Customer.findById(decoded.id).select('-password'); // Exclude password field
        if (!customer) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized'
            });
        }

        // 5. Attach the authenticated customer to req.user
        req.user = customer;

        // 6. Call next() to execute the next controller/middleware
        next();

    } catch (error) {
        // 7. Return 401 for any invalid, modified, or expired tokens
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
    }
};

module.exports = {
    protect
};

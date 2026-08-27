const bcrypt = require('bcrypt');
const Customer = require('../models/customer.model');

// Controller for registering a new customer
const registerCustomer = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;

        // 1. Check whether all required fields are present
        if (!fullName || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All fields (fullName, email, password, phone) are required.'
            });
        }

        // 2. Check password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long.'
            });
        }

        // 3. Check whether email already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists.'
            });
        }

        // 4. Hash plain password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Create new customer document in MongoDB
        const newCustomer = await Customer.create({
            fullName,
            email,
            password: hashedPassword,
            phone
        });

        // 6. Send success response (excluding password details)
        return res.status(201).json({
            success: true,
            message: 'Customer registered successfully',
            customer: {
                _id: newCustomer._id,
                fullName: newCustomer.fullName,
                email: newCustomer.email,
                phone: newCustomer.phone
            }
        });

    } catch (error) {
        // 7. Catch any unexpected server errors
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later.',
            error: error.message
        });
    }
};

module.exports = {
    registerCustomer
};

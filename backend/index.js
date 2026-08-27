require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const customerRoutes = require('./routes/customer.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for parsing cookies (needed for JWT in future steps)
app.use(cookieParser());

// Mount routes under /customers
app.use('/customers', customerRoutes);

// Basic root route
app.get('/', (req, res) => {
    res.json({ message: 'ShopKart Backend is running.' });
});

// Database connection string from .env
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopkart';

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed. Exiting now...', err.message);
        process.exit(1);
    });

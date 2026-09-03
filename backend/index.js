require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const customerRoutes = require('./routes/customer.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for credentials (cookies)
app.use(cors({
    origin: true,
    credentials: true
}));

// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Mount routes under /customers
app.use('/customers', customerRoutes);

// Basic root route
app.get('/', (req, res) => {
    res.json({ message: 'ShopKart Backend is running.' });
});

// Database connection string from .env
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopkart';

const connectDBAndStart = async () => {
    try {
        await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 });
        console.log('Successfully connected to primary MongoDB.');
    } catch (err) {
        console.warn('Primary MongoDB connection failed:', err.message);
        console.log('Starting in-memory MongoDB fallback...');
        try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            const memoryUri = mongoServer.getUri();
            await mongoose.connect(memoryUri);
            console.log('Successfully connected to in-memory MongoDB.');
        } catch (fallbackErr) {
            console.error('In-memory MongoDB connection failed. Exiting now...', fallbackErr.message);
            process.exit(1);
        }
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

connectDBAndStart();

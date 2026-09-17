const mongoose = require('mongoose');

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0.01, 'Price must be greater than 0']
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Product Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

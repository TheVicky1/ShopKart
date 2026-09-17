const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById
} = require('../controllers/product.controller');

// Route: POST /products (Create product)
router.post('/', createProduct);

// Route: GET /products (Get all products with optional search & category filter)
router.get('/', getAllProducts);

// Route: GET /products/:id (Get single product by ID)
router.get('/:id', getProductById);

module.exports = router;

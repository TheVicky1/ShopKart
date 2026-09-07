import axios from 'axios';

// Axios instance configured with backend URL and credentials enabled for cookies
const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

// Helper function to fetch products with query parameters (search, category)
export const getProducts = (params) => {
  return api.get('/products', { params });
};

// Helper function to fetch a single product by ID
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export default api;

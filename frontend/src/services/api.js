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

export default api;
